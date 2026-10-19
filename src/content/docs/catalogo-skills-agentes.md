---
title: "Catálogo de Skills para Agentes: Registro y Referencia Práctica"
slug: "catalogo-skills-agentes"
description: "Directorio vivo de skills para agentes de desarrollo (Pi, Claude Code, Cursor, Codex). Índice rápido, especificaciones técnicas, comandos de instalación y prompts de activación."
category: "Ecosistema IA"
tags: ["Skills", "Catálogo", "Frontend", "UI/UX", "OpenDesign", "Pi Agent", "Gentle-AI"]
date: "2026-10-19"
author: "Carlos Damota"
readTime: "9 min de lectura"
---

# Catálogo de Skills para Agentes

Este documento es un **registro vivo y en constante evolución** de las skills que utilizo, descubro y desarrollo para potenciar el flujo de trabajo con agentes de código (como Pi, Gentle-AI, Claude Code o Cursor).

Cada skill actúa como un paquete de directrices, herramientas y restricciones que eleva la calidad del agente en un área específica (diseño, arquitectura, testing o infraestructura).

---

## 🗂️ Directorio Rápido de Skills

Accede de un vistazo a todas las skills registradas. Haz clic en el botón de acceso para saltar directamente a su ficha técnica completa:

| Skill | Categoría | Especialidad / Propósito | Acceso Rápido |
| :--- | :--- | :--- | :--- |
| **`open-design`** *(Propia)* | Infraestructura & Ops | Supervisión del demonio local de OpenDesign, prevención del error `/usr/bin/od` y gestión MCP. | [Saltar a Ficha ↓](#open-design) |
| **`frontend-design`** | Dirección de Arte | Evita el look cliché de IA; define tipografía, jerarquía y personalidad visual intencional. | [Saltar a Ficha ↓](#frontend-design) |
| **`ui-ux-pro-max`** | Datos & Reglas UX | Motor de consulta local con 192 paletas de producto, 74 pairings tipográficos y directrices WCAG. | [Saltar a Ficha ↓](#ui-ux-pro-max) |
| **`impeccable`** | Craft & Acabado | Auditoría de calidad de producto, clasificación en 4 modos (*Persuade, Operate, Read, Experience*) y *craft-floor*. | [Saltar a Ficha ↓](#impeccable) |

> [!TIP]
> **Estructura viva:** A medida que pruebo o desarrollo nuevas skills (para TDD, arquitectura o testing), este directorio se irá ampliando con nuevas filas y sus respectivas fichas técnicas.

---

## open-design

* **Autor:** Carlos Damota *(Skill de autoría propia)*
* **Repositorio oficial:** [CarlosDamota/open-design-skill en GitHub](https://github.com/CarlosDamota/open-design-skill)
* **Categoría:** Infraestructura, ciclo de vida agéntico y supervisión de procesos.

### ¿Qué problema resuelve?
Al trabajar con OpenDesign desde agentes en terminal (Pi, Claude Code, Cursor), surgen dos problemas críticos:
1. **La trampa del octal-dump:** En Linux y macOS, ejecutar el comando `od` a secas llama a `/usr/bin/od` (GNU octal-dump), dejando al agente colgado indefinidamente esperando entrada por `stdin`.
2. **Colisiones de puertos y demonios duplicados:** Intentar iniciar el servidor sin consultar el supervisor interno (`tools-dev`) genera instancias huérfanas y errores de enlace de red.

Esta skill proporciona un wrapper determinista e idempotente (`scripts/od.sh`) con detección automática del checkout local y gestión del servidor MCP.

### Instalación rápida
```bash
# Vía CLI de skills
npx skills add CarlosDamota/open-design-skill

# O clonando en tu directorio local de skills de Pi
git clone https://github.com/CarlosDamota/open-design-skill.git ~/.agents/skills/open-design
```

### Comandos de terminal
```bash
./scripts/od.sh status   # Estado de daemon, web y URL activa
./scripts/od.sh start    # Arranque idempotente (solo si está inactivo)
./scripts/od.sh url      # Devuelve la URL del Studio web
./scripts/od.sh restart  # Reinicio de servicios
./scripts/od.sh logs     # Trazabilidad de logs
./scripts/od.sh stop     # Detención controlada
```

---

## frontend-design

* **Autor:** Anthropic
* **Repositorio oficial:** [anthropics/skills en GitHub](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
* **Categoría:** Dirección de arte y conceptualización visual.

### ¿Qué problema resuelve?
Los LLMs tienden a repetir patrones visuales predecibles cuando diseñan sin guía (fondos crema con acentos terracota, modo oscuro con verde neón, o números decorativos vacíos como `01/02`). `frontend-design` fuerza al agente a comportarse como un director de arte de un estudio de diseño, obligándolo a entender el negocio y el contexto antes de proponer estilos.

### Reglas clave que impone
* **Límite de lectura:** Ancho de línea inferior a 80 caracteres para garantizar legibilidad.
* **Tipografía deliberada:** Máximo dos familias tipográficas con alto contraste y función definida.
* **Estructura con significado:** Bordes, separadores y etiquetas deben comunicar información estructural, no rellenar espacio.
* **Animación con propósito:** Prohíbe transiciones de entrada genéricas en cascada; el movimiento debe responder a la interacción del usuario.

### Instalación rápida
```bash
npx skills add anthropics/skills --skill frontend-design
```

### Prompt de activación sugerido
> *"Activa la skill frontend-design. Necesito diseñar la cabecera (Hero) y la sección de precios para una herramienta B2B de observabilidad de APIs. Quiero una dirección visual sobria pero distintiva, alejada del estilo típico de SaaS con gradientes morados genéricos."*

---

## ui-ux-pro-max

* **Autor:** NextLevelBuilder
* **Repositorio oficial:** [nextlevelbuilder/ui-ux-pro-max-skill en GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
* **Categoría:** Base de conocimiento de ingeniería de diseño y tokens.

### ¿Qué problema resuelve?
Evita que el agente invente valores arbitrarios de espaciado, colores sin contraste o layouts quebradizos en dispositivos móviles. Proporciona una base de datos local indexada con:
* 79 estilos visuales (Minimalism, Bento Grid, Neumorphism, Glassmorphism...).
* 192 paletas razonadas clasificadas por industria (Fintech, Developer Tools, Healthcare...).
* 74 combinaciones tipográficas armónicas.
* 119 reglas de UX con anti-patrones explícitos.

### Prioridades que evalúa
1. **Accesibilidad (WCAG AA):** Contraste mínimo de 4.5:1, etiquetas `aria-*` y navegación completa por teclado.
2. **Interacción táctil:** Tamaño mínimo interactivo de 44×44px y 8px de separación.
3. **Responsive:** Enfoque mobile-first, sin scroll horizontal accidental.
4. **Rendimiento:** Formatos WebP/AVIF y prevención de Cumulative Layout Shift (CLS < 0.1).

### Instalación rápida
```bash
npx skills add nextlevelbuilder/ui-ux-pro-max-skill
```

### Búsqueda local de reglas
```bash
# Consultar paletas para herramientas de desarrollo
python .agents/skills/ui-ux-pro-max/scripts/search.py --domain color --query "developer tools"

# Consultar directrices para Bento Grids
python .agents/skills/ui-ux-pro-max/scripts/search.py --domain style --query "bento grid"
```

---

## impeccable

* **Autor:** Paul Bakaus (creador de jQuery UI, ex-Google/Apple)
* **Repositorio oficial:** [pbakaus/impeccable en GitHub](https://github.com/pbakaus/impeccable)
* **Categoría:** Control de calidad, artesanía de interfaces y craft-floor.

### ¿Qué problema resuelve?
Actúa como un auditor senior de producto antes de entregar o fusionar código visual. Clasifica cada pantalla en **4 modos de interacción** y aplica un estricto *craft-floor* (suelo de calidad) para evitar detalles descuidados:

| Modo | Objetivo del usuario | Dónde se aplica | Mentalidad |
| :--- | :--- | :--- | :--- |
| **Persuade** | Decidir y actuar | Landing pages, marketing | Ambición visual, atrevimiento y punto de vista. |
| **Operate** | Completar tareas | Dashboards, editores, admin | Escaneabilidad, ergonomía y predictibilidad nativa. |
| **Read** | Comprender y aprender | Documentación, guías | Jerarquía limpia, legibilidad y descanso visual. |
| **Experience** | Inmersión en la obra | Portafolios, galerías | La interfaz se retira; el proyecto lidera. |

### Reglas clave del craft-floor
* Cobertura de estados obligatoria (`:hover`, `:focus-visible`, `:active`, `:disabled`).
* Cero saltos de contenido con skeletons calibrados al tamaño real.
* Mensajes de error contextuados junto al input, nunca banners genéricos.

### Instalación rápida
```bash
npx skills add pbakaus/impeccable
```

### Prompt de activación sugerido
> *"Ejecuta una auditoría de calidad con impeccable sobre el componente de formulario de contacto. Considera que está en modo Persuade. Identifica qué detalles rompen el craft-floor y propón los ajustes necesarios."*

---

## Flujo de Trabajo Integrado

Cuando abordo el desarrollo de una funcionalidad visual completa con agentes, combino estas skills en una secuencia lógica:

```
[1. Infraestructura]    open-design      ──► Supervisa y garantiza que el Studio y el MCP estén activos.
[2. Dirección de Arte]  frontend-design  ──► Define la identidad visual y composición.
[3. Datos y Tokens]     ui-ux-pro-max    ──► Suministra paletas, WCAG y responsive.
[4. Control de Calidad] impeccable       ──► Audita estados interactivos y craft floor.
```

1. **Fase 1 (Entorno):** `open-design` asegura que el entorno de prototipado y las herramientas MCP estén levantadas sin colisiones.
2. **Fase 2 (Concepto):** `frontend-design` marca el tono y la personalidad única del diseño.
3. **Fase 3 (Construcción):** `ui-ux-pro-max` proporciona los tokens exactos y garantiza la accesibilidad técnica.
4. **Fase 4 (Entrega):** `impeccable` ejecuta la auditoría final previa al commit o pull request.
