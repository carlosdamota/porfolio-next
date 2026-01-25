'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  const supabase = await createClient()

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
    return
  }

  revalidatePath('/projects')
  revalidatePath('/')
  redirect('/admin')
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error eliminating project', error)
    return
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
}

export async function updateProjectOrder(formData: FormData) {
  const supabase = await createClient()
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
  const id = formData.get('id') as string
  
  // 1. Get current images from form (these are the ones already in Supabase, possibly reordered)
  const existingImagesJson = formData.get('existingImages') as string
  let imageUrls: string[] = existingImagesJson ? JSON.parse(existingImagesJson) : []

  // 2. Upload NEW Images
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
        
      imageUrls.push(publicUrl)
    }
  }

  // 3. Update Project Data
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
    return
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  revalidatePath(`/projects/${slug}`)
  revalidatePath('/')
}

