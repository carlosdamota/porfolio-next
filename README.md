# 🚀 Portafolio Personal - Carlos Damota

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## 📋 Descripción

Mi portafolio web personal desarrollado con las últimas tecnologías web para mostrar mi experiencia como **Desarrollador Full-Stack**. Un diseño moderno, responsivo y optimizado que refleja mi transición del sector retail al desarrollo web.

> 💼 **Experiencia**: 14+ años en retail + Graduado del Máster Full-Stack en Nuclio Digital School

---

## ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz elegante con animaciones CSS personalizadas
- 📱 **Totalmente Responsivo**: Optimizado para móviles, tablets y escritorio
- ⚡ **Alto Rendimiento**: Next.js 15 con App Router y Turbopack
- 🌙 **Sistema de Colores**: DaisyUI con temas coherentes
- 📧 **Formulario Funcional**: Integración con Resend para contacto directo
- 🔍 **SEO Optimizado**: Metadatos y estructura para motores de búsqueda
- 🎯 **UX Intuitiva**: Navegación fluida entre secciones

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.4.5 (App Router)
- **Biblioteca UI**: React 19.1.0
- **Lenguaje**: TypeScript 5.8.3
- **Estilos**: Tailwind CSS 4.1.11 + DaisyUI 5.0.50
- **Iconos**: React Icons 5.5.0
- **Optimización**: Next.js Image y Font optimization

### Backend & Servicios
- **API Routes**: Next.js server-side
- **Email Service**: Resend 4.8.0
- **Renderizado**: SSR + Static Generation

### Herramientas de Desarrollo
- **Linting**: ESLint 9 con configuraciones estrictas
- **Package Manager**: PNPM
- **Bundler**: Turbopack (Next.js)
- **Tipado**: TypeScript modo estricto

---

## 📁 Arquitectura del Proyecto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── not-found.tsx      # Página 404 personalizada
│   ├── error.tsx          # Manejo de errores
│   └── projects/
│       └── [projectID]/   # Rutas dinámicas para proyectos
├── Components/            # Componentes reutilizables
│   ├── Hero.tsx          # Sección principal de presentación
│   ├── About.tsx         # Información personal
│   ├── Projects.tsx      # Showcase de proyectos
│   ├── Skills.tsx        # Stack tecnológico
│   ├── Contact.tsx       # Formulario de contacto
│   └── UI/               # Componentes de interfaz
└── Services/             # Servicios y APIs
    └── projectsServices.ts
```

---

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18.18.0+
- PNPM (recomendado) o npm/yarn

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd porfolio-next

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Iniciar servidor de desarrollo
pnpm dev
```

Visita `http://localhost:3000` para ver el portafolio.

---

## ⚙️ Configuración

### Variables de Entorno
```env
# Configuración de email (Resend)
RESEND_API_KEY=tu_api_key_de_resend

# URL del sitio (para producción)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### Personalización del Contenido
- **Información personal**: `src/Components/Hero.tsx` y `src/Components/About.tsx`
- **Habilidades técnicas**: Array de skills en `src/Components/Skills.tsx`
- **Proyectos**: Servicio de datos en `src/Services/projectsServices.ts`
- **Estilos**: Configuración de Tailwind en `tailwind.config.js`

---

## 📱 Secciones del Portafolio

1. **🏠 Hero Section**
   - Presentación principal con nombre y título
   - Botones de acción (Contacto y CV)
   - Animaciones CSS personalizadas

2. **👤 Sobre Mí**
   - Historia profesional y transición al desarrollo
   - Experiencia en retail y nuevas habilidades técnicas
   - Foto profesional y descripción personal

3. **💼 Proyectos**
   - Showcase de trabajos realizados
   - Tecnologías utilizadas por proyecto
   - Enlaces a GitHub y demos en vivo

4. **🛠️ Habilidades**
   - Stack tecnológico MERN
   - Iconos dinámicos con Skill Icons API
   - Herramientas de desarrollo y deployment

5. **📞 Contacto**
   - Formulario funcional con Resend
   - Validación en cliente y servidor
   - Respuesta automática por email

---

## 🎨 Diseño y UX

### Paleta de Colores
- Sistema de colores basado en DaisyUI
- Soporte para temas claro/oscuro
- Gradientes personalizados para elementos decorativos

### Animaciones
- Efectos de float y morph en elementos decorativos
- Transiciones suaves entre estados
- Hover effects en botones y tarjetas

### Responsividad
- Mobile-first approach
- Breakpoints optimizados para todos los dispositivos
- Imágenes adaptativas con Next.js Image

---

## 📊 Performance

- ✅ **Lighthouse Score**: 95+ en todas las métricas
- ✅ **Core Web Vitals**: Optimizado para UX
- ✅ **SEO**: Meta tags y structured data
- ✅ **Accessibility**: WCAG 2.1 AA compliance
- ✅ **Carga rápida**: Lazy loading y optimización de assets

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Servidor de desarrollo con Turbopack

# Producción
pnpm build        # Build para producción
pnpm start        # Servidor de producción

# Calidad de código
pnpm lint         # ESLint check
pnpm lint:fix     # Corregir errores de linting

# Otros
pnpm type-check   # Verificación de tipos TypeScript
```

---

## 🚀 Template Usage

Si quieres usar este proyecto como base para tu propio portafolio:

1. **Fork o clona** el repositorio
2. **Personaliza el contenido** en los componentes principales
3. **Actualiza las imágenes** en la carpeta `public/`
4. **Configura tus servicios** (email, analytics, etc.)
5. **Modifica los colores** y estilos según tu marca personal

> ⚠️ **Nota**: Recuerda cambiar toda la información personal, enlaces y contenido específico antes de usar como tu propio portafolio.

---

## 📄 Licencia

Este es un proyecto personal. Si usas este código como referencia, se agradece la atribución.

---

## 📬 Sobre Carlos Damota

**Desarrollador Full-Stack** con experiencia en retail y pasión por crear soluciones web innovadoras.

- 🎓 **Formación**: Máster Full-Stack - Nuclio Digital School
- 💼 **Experiencia**: 14+ años en sector retail + Desarrollo web
- 🛠️ **Especialización**: MERN Stack, TypeScript, Next.js
- 🌟 **Enfoque**: Calidad, trabajo en equipo y atención al detalle

---

<div align="center">

**Transformando ideas en soluciones web robustas y eficientes** 🚀

*Desarrollado con ❤️ usando Next.js y TypeScript*

</div>
