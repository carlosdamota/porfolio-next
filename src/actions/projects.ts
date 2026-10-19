'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireUser(supabase: any) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('No autorizado. Debes iniciar sesión como administrador.')
  }
  return user
}

function extractStoragePath(imageUrl: string, bucket = 'portfolio-images'): string | null {
  if (!imageUrl || typeof imageUrl !== 'string') return null
  
  try {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      const url = new URL(imageUrl)
      const marker = `/storage/v1/object/public/${bucket}/`
      const index = url.pathname.indexOf(marker)
      if (index !== -1) {
        return decodeURIComponent(url.pathname.substring(index + marker.length))
      }

      const bucketMarker = `/${bucket}/`
      const bIndex = url.pathname.indexOf(bucketMarker)
      if (bIndex !== -1) {
        return decodeURIComponent(url.pathname.substring(bIndex + bucketMarker.length))
      }

      return null
    }

    const marker = `/${bucket}/`
    const index = imageUrl.indexOf(marker)
    if (index !== -1) {
      const pathPart = imageUrl.substring(index + marker.length).split('?')[0].split('#')[0]
      return decodeURIComponent(pathPart)
    }

    if (!imageUrl.includes('/')) {
      return decodeURIComponent(imageUrl.split('?')[0].split('#')[0])
    }

    return null
  } catch (err) {
    console.error('Error parsing storage path from URL:', imageUrl, err)
    return null
  }
}

async function removeStorageImages(supabase: any, urls: string[], bucket = 'portfolio-images') {
  if (!urls || urls.length === 0) return

  const paths = urls
    .map(url => extractStoragePath(url, bucket))
    .filter((path): path is string => Boolean(path && path.trim().length > 0))

  if (paths.length === 0) return

  try {
    const { data, error } = await supabase.storage.from(bucket).remove(paths)
    if (error) {
      console.error('Error removing files from storage:', error)
    }
    return data
  } catch (err) {
    console.error('Unexpected error removing files from storage:', err)
  }
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  await requireUser(supabase)

  // 1. Upload Multiple Images
  const imageFiles = formData.getAll('images') as File[]
  const imageUrls: string[] = []

  for (const imageFile of imageFiles) {
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        console.error('Error uploading image', uploadError)
        continue
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName)
        
      imageUrls.push(publicUrl)
    }
  }

  // 2. Insert Project Data
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const repoUrl = formData.get('repoUrl') as string
  const demoUrl = formData.get('demoUrl') as string
  const role = formData.get('role') as string
  const year = parseInt(formData.get('year') as string)
  const sort_order = parseInt(formData.get('sortOrder') as string) || 0
  const tagsString = formData.get('tags') as string
  const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '')

  // Generate Slug
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const { error: insertError } = await supabase
    .from('projects')
    .insert({
      title,
      slug,
      description,
      year,
      role,
      sort_order,
      images: imageUrls,
      repo_url: repoUrl,
      demo_url: demoUrl,
      tags: tags,
    })

  if (insertError) {
    console.error('Error inserting project', insertError)
    if (imageUrls.length > 0) {
      await removeStorageImages(supabase, imageUrls)
    }
    return
  }

  revalidatePath('/projects')
  revalidatePath('/')
  redirect('/admin')
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient()
  await requireUser(supabase)
  const id = formData.get('id') as string

  // 1. Fetch project images to clean up storage after deletion
  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select('images')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('Error fetching project before deletion', fetchError)
  }

  // 2. Delete project from database
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error eliminating project', error)
    return
  }

  // 3. Clean up associated images in Supabase Storage
  if (project?.images && Array.isArray(project.images) && project.images.length > 0) {
    await removeStorageImages(supabase, project.images)
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  revalidatePath('/')
}

export async function updateProjectOrder(formData: FormData) {
  const supabase = await createClient()
  await requireUser(supabase)
  const id = formData.get('id') as string
  const sort_order = parseInt(formData.get('sort_order') as string)

  const { error } = await supabase
    .from('projects')
    .update({ sort_order })
    .eq('id', id)

  if (error) {
    console.error('Error updating project order', error)
    return
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  revalidatePath('/')
}

export async function updateProject(formData: FormData) {
  const supabase = await createClient()
  await requireUser(supabase)
  const id = formData.get('id') as string
  
  // 1. Fetch current project to detect images being removed
  const { data: currentProject } = await supabase
    .from('projects')
    .select('images')
    .eq('id', id)
    .single()

  const oldImages: string[] = currentProject?.images || []

  // 2. Get current images from form (these are the ones already in Supabase, possibly reordered)
  const existingImagesJson = formData.get('existingImages') as string
  const keptImages: string[] = existingImagesJson ? JSON.parse(existingImagesJson) : []
  let imageUrls: string[] = [...keptImages]

  // Track newly uploaded images to clean up if database update fails
  const newlyUploadedUrls: string[] = []

  // 3. Upload NEW Images
  const newImageFiles = formData.getAll('images') as File[]
  
  for (const imageFile of newImageFiles) {
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        console.error('Error uploading image', uploadError)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName)
        
      newlyUploadedUrls.push(publicUrl)
      imageUrls.push(publicUrl)
    }
  }

  // 4. Update Project Data
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const repoUrl = formData.get('repoUrl') as string
  const demoUrl = formData.get('demoUrl') as string
  const role = formData.get('role') as string
  const year = parseInt(formData.get('year') as string)
  const sort_order = parseInt(formData.get('sortOrder') as string) || 0
  const tagsString = formData.get('tags') as string
  const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '')

  // Update Slug if title changed? Optional, but title -> slug is usually expected
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const { error: updateError } = await supabase
    .from('projects')
    .update({
      title,
      slug,
      description,
      year,
      role,
      sort_order,
      images: imageUrls,
      repo_url: repoUrl,
      demo_url: demoUrl,
      tags: tags,
    })
    .eq('id', id)

  if (updateError) {
    console.error('Error updating project', updateError)
    // Clean up newly uploaded files if DB update failed
    if (newlyUploadedUrls.length > 0) {
      await removeStorageImages(supabase, newlyUploadedUrls)
    }
    return
  }

  // 5. Clean up discarded images from storage now that DB update succeeded
  const discardedImages = oldImages.filter(img => !keptImages.includes(img))
  if (discardedImages.length > 0) {
    await removeStorageImages(supabase, discardedImages)
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  revalidatePath(`/projects/${slug}`)
  revalidatePath('/')
}

