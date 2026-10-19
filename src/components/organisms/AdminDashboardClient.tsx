"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { CreateProjectForm } from "@/components/organisms/CreateProjectForm";
import { deleteProject, updateProjectOrder } from "@/actions/projects";
import { 
  FiChevronUp, 
  FiChevronDown, 
  FiEdit2, 
  FiTrash2, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiX 
} from "react-icons/fi";

export interface AdminProject {
  _id: string;
  title: string;
  description: string;
  gallery: string[];
  projectSkills: string[];
  githubProjectLink?: string;
  liveLink?: string;
  year?: number;
  category: string;
  sort_order: number;
}

interface Props {
  initialProjects: AdminProject[];
}

export function AdminDashboardClient({ initialProjects }: Props) {
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects);
  const [projectToEdit, setProjectToEdit] = useState<AdminProject | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<AdminProject | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();

  // Keep state in sync with server revalidation updates
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  const handleEdit = (project: AdminProject) => {
    setProjectToEdit(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setProjectToEdit(null);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const previousProjects = [...projects];
    const newProjects = [...projects];
    const project1 = { ...newProjects[index] };
    const project2 = { ...newProjects[targetIndex] };

    let order1 = project2.sort_order;
    let order2 = project1.sort_order;

    if (order1 === order2) {
      order1 = index - 1;
      order2 = index;
    }

    project1.sort_order = order1;
    project2.sort_order = order2;
    newProjects[index] = project2;
    newProjects[targetIndex] = project1;
    setProjects(newProjects);

    startTransition(async () => {
      try {
        const fd1 = new FormData();
        fd1.append("id", project1._id);
        fd1.append("sort_order", String(order1));

        const fd2 = new FormData();
        fd2.append("id", project2._id);
        fd2.append("sort_order", String(order2));

        await Promise.all([
          updateProjectOrder(fd1),
          updateProjectOrder(fd2),
        ]);
        showToast("Orden de proyectos actualizado");
      } catch (err) {
        console.error("Error updating project order:", err);
        setProjects(previousProjects);
        showToast("Error al actualizar el orden", "error");
      }
    });
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);

    try {
      const fd = new FormData();
      fd.append("id", projectToDelete._id);
      await deleteProject(fd);

      if (projectToEdit?._id === projectToDelete._id) {
        setProjectToEdit(null);
      }

      showToast(`Proyecto "${projectToDelete.title}" eliminado`);
      setProjectToDelete(null);
    } catch (err) {
      console.error("Error deleting project:", err);
      showToast("Error al eliminar el proyecto", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* FORM SECTION */}
        <div className="sticky top-8">
          <CreateProjectForm
            key={projectToEdit ? projectToEdit._id : "new-project"}
            projectToEdit={projectToEdit}
            onCancelEdit={handleCancelEdit}
            onSuccess={(type) => {
              showToast(
                type === "updated"
                  ? "Proyecto actualizado correctamente"
                  : "Proyecto publicado correctamente"
              );
            }}
          />
        </div>

        {/* PROJECT LIST */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-bold">Gestionar Proyectos</h2>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              Total: {projects.length}
            </span>
          </div>

          <div className="grid gap-4">
            {projects.map((project, idx) => (
              <div
                key={project._id}
                className={`flex gap-4 p-4 bg-card rounded-xl border transition-all duration-200 items-center group ${
                  projectToEdit?._id === project._id
                    ? "border-primary shadow-sm shadow-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0 border border-border/40">
                  {project.gallery && project.gallery[0] ? (
                    <Image
                      src={project.gallery[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                      Sin foto
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold truncate text-sm text-foreground">
                      {project.title}
                    </h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold">
                      Ord: {project.sort_order}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {project.category} {project.year ? `• ${project.year}` : ""}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-0.5 mr-1">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 hover:bg-primary/10 text-primary rounded disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                      title="Subir orden"
                      aria-label={`Subir ${project.title}`}
                    >
                      <FiChevronUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === projects.length - 1}
                      className="p-1 hover:bg-primary/10 text-primary rounded disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                      title="Bajar orden"
                      aria-label={`Bajar ${project.title}`}
                    >
                      <FiChevronDown className="size-3.5" />
                    </button>
                  </div>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => handleEdit(project)}
                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                    title="Editar proyecto"
                    aria-label={`Editar ${project.title}`}
                  >
                    <FiEdit2 className="size-4" />
                  </button>

                  {/* Delete Button (Triggers modern modal) */}
                  <button
                    type="button"
                    onClick={() => setProjectToDelete(project)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Eliminar proyecto"
                    aria-label={`Eliminar ${project.title}`}
                  >
                    <FiTrash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="text-muted-foreground text-center py-12 bg-card rounded-xl border border-dashed border-border">
              No hay proyectos creados aún. ¡Empieza creando uno!
            </p>
          )}
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => {
            if (!isDeleting) setProjectToDelete(null);
          }}
        >
          <div
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="size-11 rounded-full bg-destructive/15 text-destructive flex items-center justify-center flex-shrink-0">
                <FiAlertTriangle className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 id="modal-title" className="text-lg font-bold text-foreground">
                  ¿Eliminar proyecto?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Estás a punto de eliminar{" "}
                  <span className="font-semibold text-foreground">
                    &quot;{projectToDelete.title}&quot;
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive-foreground leading-relaxed">
              ⚠️ Esta acción eliminará el registro de la base de datos y{" "}
              <strong className="font-bold">
                purgará de forma permanente todas sus imágenes en Supabase Storage
              </strong>
              . Esta operación no se puede revertir.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-sm font-semibold border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-semibold bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {isDeleting ? (
                  <>
                    <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="size-4" />
                    Eliminar definitivamente
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl bg-card text-foreground border-border animate-in slide-in-from-bottom-5 duration-300"
          role="status"
          aria-live="polite"
        >
          {toast.type === "success" ? (
            <FiCheckCircle className="size-5 text-emerald-500 flex-shrink-0" />
          ) : (
            <FiAlertTriangle className="size-5 text-destructive flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors ml-2"
            aria-label="Cerrar notificación"
          >
            <FiX className="size-4" />
          </button>
        </div>
      )}
    </>
  );
}
