"use client";

import { createProject, updateProject } from "@/actions/projects";
import React, { useState, useEffect } from "react";
import { TechSelector } from "../molecules/TechSelector";
import Image from "next/image";

interface ProjectToEdit {
  _id: string;
  title: string;
  description: string;
  gallery: string[];
  projectSkills: string[];
  githubProjectLink?: string;
  liveLink?: string;
  year?: number;
  category: string;
  sort_order?: number;
}

interface Props {
  projectToEdit?: ProjectToEdit | null;
  onCancelEdit?: () => void;
}

export const CreateProjectForm = ({ projectToEdit, onCancelEdit }: Props) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImagesPreview, setNewImagesPreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state with projectToEdit
  useEffect(() => {
    // Revoke any existing object URLs to avoid memory leaks
    newImagesPreview.forEach(url => URL.revokeObjectURL(url));
    setNewImagesPreview([]);

    if (projectToEdit) {
      setSelectedTechs(projectToEdit.projectSkills);
      setExistingImages(projectToEdit.gallery || []);
    } else {
      setSelectedTechs([]);
      setExistingImages([]);
    }
  }, [projectToEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clean up previous previews
    newImagesPreview.forEach(url => URL.revokeObjectURL(url));

    const files = e.target.files;
    if (!files) {
      setNewImagesPreview([]);
      return;
    }
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setNewImagesPreview(urls);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    formData.set("tags", selectedTechs.join(","));
    
    if (projectToEdit) {
      formData.set("id", projectToEdit._id);
      formData.set("existingImages", JSON.stringify(existingImages));
      await updateProject(formData);
      if (onCancelEdit) onCancelEdit();
    } else {
      await createProject(formData);
    }
    
    // Cleanup previews
    newImagesPreview.forEach(url => URL.revokeObjectURL(url));
    setNewImagesPreview([]);
    setSelectedTechs([]);
    setExistingImages([]);
    setIsSubmitting(false);
    
    const form = document.querySelector('form') as HTMLFormElement;
    if(form) form.reset();
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...existingImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setExistingImages(newImages);
  };

  const removeImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  return (
    <div className={`bg-card p-8 rounded-2xl border transition-all duration-300 shadow-sm ${projectToEdit ? "border-primary/50 shadow-md shadow-primary/5 bg-gradient-to-br from-card via-primary-glow/2 to-card" : "border-border"}`}>
      {projectToEdit && (
        <div className="mb-6 flex justify-between items-center bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-xl text-xs font-semibold animate-pulse">
          <span>✨ MODO EDICIÓN ACTIVO</span>
          <button type="button" onClick={onCancelEdit} className="hover:underline font-bold text-[10px]">
            CANCELAR
          </button>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6">
        {projectToEdit ? `Editando: ${projectToEdit.title}` : "Crear Nuevo Proyecto"}
      </h2>
      <form action={handleSubmit} className="space-y-4">
        {projectToEdit && <input type="hidden" name="id" value={projectToEdit._id} />}
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <input
            name="title"
            required
            defaultValue={projectToEdit?.title || ""}
            className="w-full px-4 py-2 border rounded-lg bg-background"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Año</label>
            <input
              name="year"
              type="number"
              placeholder="2024"
              required
              min="2000"
              max="2100"
              defaultValue={projectToEdit?.year || 2024}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Rol / Categoría</label>
            <select
              name="role"
              required
              defaultValue={projectToEdit?.category || "Fullstack"}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            >
              <option value="Fullstack">Fullstack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="UI/UX">UI/UX</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Orden</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue={projectToEdit?.sort_order || 0}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={projectToEdit?.description || ""}
            className="w-full px-4 py-2 border rounded-lg bg-background"
          />
        </div>

        <TechSelector 
          selectedTechs={selectedTechs} 
          onChange={setSelectedTechs} 
        />
        <input type="hidden" name="tags" value={selectedTechs.join(",")} />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Repo URL</label>
            <input
              name="repoUrl"
              type="url"
              defaultValue={projectToEdit?.githubProjectLink || ""}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Demo URL</label>
            <input
              name="demoUrl"
              type="url"
              defaultValue={projectToEdit?.liveLink || ""}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
        </div>

        {/* Existing Images Management */}
        {existingImages.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Imágenes en el servidor (Usa las flechas para ordenar)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {existingImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-border h-24 bg-black/20">
                  <Image src={img} alt="preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <button type="button" onClick={() => moveImage(idx, 'up')} className="text-white p-1 bg-primary rounded hover:bg-primary/90 text-xs transition-colors">↑</button>
                    <button type="button" onClick={() => moveImage(idx, 'down')} className="text-white p-1 bg-primary rounded hover:bg-primary/90 text-xs transition-colors">↓</button>
                    <button type="button" onClick={() => removeImage(idx)} className="text-white p-1 bg-destructive rounded hover:bg-destructive/90 text-xs transition-colors">×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local selected images live preview */}
        {newImagesPreview.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Nuevas imágenes seleccionadas ({newImagesPreview.length})</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {newImagesPreview.map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden border border-primary/30 h-24 bg-black/20">
                  <Image src={img} alt="new upload preview" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Añadir más imágenes</label>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Guardando..." : projectToEdit ? "Guardar Cambios" : "Publicar Proyecto"}
          </button>
          {projectToEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-3 font-semibold border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
