# 🚀 Portafolio Personal - Carlos Damota

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Integrated-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## 📋 Descripción

Portafolio profesional de alto rendimiento desarrollado con **Next.js 16** y **Supabase**. El sitio cuenta con una arquitectura moderna siguiendo los principios de **Atomic Design**, un sistema de gestión de contenidos (CMS) propio y optimización SEO avanzada.

---

## ✨ Características Principales

- 🔐 **Admin Dashboard**: Panel de control privado para gestionar el contenido del portafolio.
- 🖼️ **Gestión de Proyectos**: Subida de múltiples imágenes por proyecto con previsualización en carrusel.
- 🏷️ **Etiquetado Predictivo**: Sistema de tags con diccionario técnico integrado para evitar inconsistencias.
- 🔢 **Ordenación Manual**: Control total sobre el orden de aparición de los proyectos en la Home.
- 📱 **Totalmente Responsivo**: Diseño adaptativo optimizado para todos los dispositivos.
- 🔍 **SEO Dinámico**: Generación automática de Metadatos y Sitemaps basados en el contenido de Supabase.
- ⚡ **Rendimiento Extremo**: Uso intensivo de **React Server Components** y optimización nativa de imágenes.

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 16.1.4 (App Router + Turbopack)
- **Biblioteca UI**: React 19.x (React Compiler habilitado)
- **Estilos**: Tailwind CSS 4.x + DaisyUI 5.0.50
- **Animaciones**: Framer Motion & CSS Custom Animations

### Backend (BaaS)
- **Base de Datos**: Supabase (PostgreSQL) con Row Level Security (RLS)
- **Autenticación**: Supabase Auth (Middleware protection)
- **Almacenamiento**: Supabase Storage para imágenes del portafolio

### Otros Servicios
- **Email**: Resend (Integración para contacto)
- **Analíticas**: Vercel Analytics

---

## 📁 Arquitectura (Atomic Design)

```
src/
├── app/                  # App Router (Next.js)
├── actions/              # Server Actions (Mutaciones de datos)
├── components/           # UI Components
│   ├── atoms/            # Elementos básicos (Button, ScrollReveal)
│   ├── molecules/        # Conjuntos funcionales (Carousel, TechSelector)
│   └── organisms/        # Secciones completas (Hero, Projects, Navbar)
├── utils/                # Utilidades y configuración de Supabase
└── proxy.ts              # Middleware de seguridad
```

---

## 🚀 Despliegue y Desarrollo

### Requisitos Previos
- Cuenta en **Supabase** (crear tabla `projects` y bucket `portfolio-images`).
- **PNPM** instalado.

### Instalación

1. Clonar repositorio.
2. `pnpm install`
3. Configurar `.env.local` (ver sección siguiente).
4. `pnpm dev`

### Variables de Entorno (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
RESEND_API_KEY=tu_api_key_de_resend
```

---

## 🛡️ Seguridad

El sistema utiliza **Middleware** para proteger las rutas `/admin` y **RLS** en Postgres para asegurar que solo el propietario del portafolio pueda modificar los datos, mientras que el público solo tiene permiso de lectura.

---

## 📬 Contacto

**Carlos Damota** - Desarrollador apasionado por la tecnología y el diseño eficiente.
- [LinkedIn](https://www.linkedin.com/in/carlos-damota/)
- [GitHub](https://github.com/carlosdamota)

---
<div align="center">
  <b>Construido con precisión y centrado en la experiencia de usuario.</b>
</div>
