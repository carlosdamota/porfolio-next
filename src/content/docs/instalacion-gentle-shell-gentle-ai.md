---
title: "Guía Completa de Gentle-AI y Gentle-Shell: Instalación, ODD y Flujo Agéntico"
slug: "instalacion-gentle-shell-gentle-ai"
description: "Manual de configuración, métodos de instalación (v4.3.0), atajos de teclado y flujo de desarrollo con Organic Driven Development (ODD) para Pi coding agent."
category: "Ecosistema IA"
tags: ["Gentle-AI", "Gentle-Shell", "Pi Agent", "ODD", "Dev Environment", "v4.3.0"]
date: "2026-10-19"
author: "Carlos Damota"
readTime: "8 min de lectura"
---

# Guía de Gentle-AI y Gentle-Shell: Entorno de Desarrollo Agéntico

> **Versión actual de referencia:** `v4.3.0` (última versión estable publicada en npm).  
> **Requisitos mínimos:** Node.js `>= 22.19.0` y Pi `>= 1.2.0`.

En el desarrollo de software asistido por agentes autónomos de código, el mayor cuello de botella rara vez es la capacidad del modelo para generar código: suele ser **la pérdida de contexto, la falta de control visual sobre lo que modifica y la ausencia de una metodología disciplinada** que evite romper código existente.

**Gentle-Shell** (paquete `gentle-pi`) convierte el harness de terminal **Pi** en una estación de trabajo completa para liderar agentes de desarrollo bajo la metodología **Organic Driven Development (ODD)**.

---

## Diferencias: ¿Qué es cada componente?

* **Pi (`@earendil-works/pi-coding-agent`):** El runtime base y motor de ejecución en terminal.
* **gentle-shell:** La interfaz TUI y entorno de trabajo. Proporciona paneles laterales con estado en tiempo real, visor de diffs Git en pantalla completa (`alt+g`), panel de subagentes (`alt+a`), paleta de comandos (`alt+k`) y gestión de procesos en segundo plano.
* **gentle-ai:** El CLI y conjunto de extensiones que gobiernan el flujo ODD, la sincronización de assets, contratos de revisión de código y delegación justificada a subagentes.
* **el Gentleman:** El perfil de arquitecto senior que coordina las sesiones: conceptos antes de código, pruebas primero (TDD) cuando aplica y justificación rigurosa antes de cada refactor.

---

## Métodos de Instalación (v4.3.0)

Existen dos vías principales según si ya utilizas Pi o prefieres un entorno aislado sin interferencias.

### Método A: Standalone vía npm (Recomendado)
Instala `gentle-shell` de forma global. Crea su propio entorno aislado en `~/.gentle-shell` sin alterar la configuración previa de Pi:

```bash
# 1. Instalar el paquete global (v4.3.0)
npm i -g gentle-pi@latest

# 2. Iniciar gentle-shell en tu proyecto (home aislado)
gentle-shell

# 3. (Opcional) Vincular tus modelos y logins existentes de Pi
gentle-shell --link
```

> [!TIP]
> Si deseas sincronizar tus credenciales de proveedores (OpenAI, Anthropic, Google, NaN) desde tu Pi local hacia el nuevo entorno de Gentle-Shell sin compartir carpetas de plugins, ejecuta:
> ```bash
> gentle-shell home import-pi
> ```

---

### Método B: Integrado dentro de una instalación existente de Pi
Si ya eres usuario de Pi y deseas que Gentle-Shell cargue como un paquete dentro de tu instalación habitual:

```bash
# 1. Instalar el paquete dentro de Pi fijando la última versión
pi install npm:gentle-pi@4.3.0

# 2. Sincronizar extensiones, themes y skills
gentle-ai sync

# 3. Ejecutar Pi normalmente en tu proyecto
pi
```

---

## Verificación de Salud del Entorno

Una vez dentro de la terminal interactiva de Gentle-Shell, ejecuta estos comandos para validar dependencias, MCPs y permisos:

```text
/gentle:status   # Muestra versión activa (v4.3.0), perfil de enrutamiento y estado de contexto
/gentle:doctor   # Audita herramientas locales, sockets de audio, Git y MCP servers
```

---

## Atajos de Teclado y Comandos Principales

Gentle-Shell dota a la terminal de capacidades visuales para que no tengas que salir a otra pestaña para revisar git o controlar subagentes:

| Atajo / Comando | Función | Utilidad |
| :--- | :--- | :--- |
| **`alt + g`** | **Gentle Changes** | Visor de cambios Git en pantalla partida con recuento de líneas y diff interactivo contra `HEAD`. |
| **`alt + a`** | **Gentle Agents** | Monitor de subagentes en paralelo con métricas de tokens consumidos, coste y tiempo transcurrido. |
| **`alt + k`** | **Command Palette** | Menú desplegable instantáneo con todos los comandos y extensiones disponibles. |
| `/gentle:jobs` | **Background Jobs** | Inspección, logs y detención de procesos que corren en segundo plano (`job_stop`). |
| `/gentle:customize`| **Personalización TUI** | Selector interactivo de temas, disposición de la barra (derecha o inferior) y modo Vim. |
| `/gentle:stats` | **Métricas Locales** | Mapa de calor de actividad, historial de uso, tokens y consumo por modelo. |

---

## Modos de Permisos (Control vs Autonomía)

Gentle-Shell ofrece tres modos de supervisión según la naturaleza de la tarea:

1. **Normal (`/gentle:mode normal`):**  
   Modo clásico. Solicita confirmación explícita para cada escritura de archivo, ejecución de comando o mutación de estado.
2. **Auto (`/gentle:mode auto`):**  
   Evalúa mediante inferencia independiente si una acción de lectura/ejecución es segura en base al contexto de la conversación, reduciendo preguntas triviales sin rebajar la seguridad.
3. **YOLO (`/gentle:yolo enable`):**  
   Otorga permiso de ejecución continua para implementaciones ya acordadas, tests y commits en ramas de trabajo. **Las acciones destructivas (borrados masivos, force-push) siguen requiriendo confirmación obligatoria humana.**

---

## La Metodología ODD (Organic Driven Development)

Gentle-AI no trabaja "a ciegas". Todo desarrollo sigue un flujo estricto de 7 etapas:

```
[1. Authorize]  ──► [2. Explore]  ──► [3. Resolve]  ──► [4. Classify]
                                                              │
                    ┌─────────────────────────────────────────┘
                    ▼
          ¿Tarea pequeña o grande?
          ├── Pequeña: Ejecución inline en el hilo principal (RED ──► GREEN ──► Refactor).
          └── Grande:  [5. Track] ──► Creación de odd/tasks/<feature>.md
                                        │
                                        ▼
                                [6. Implement] ──► Delegación proporcional
                                        │
                                        ▼
                                [7. Close]     ──► Cierre con línea de riesgo (Risk line)
```

### Reglas de Delegación Proporcional
Uno de los mayores errores en el uso de agentes es lanzar subagentes para tareas diminutas o, al revés, sobrecargar al agente principal con lecturas de miles de tokens:
* **Inline (sin subagentes):** Tareas entendidas cuyo diff cabe en la memoria de trabajo y pueden resolverse en una sola sesión.
* **Explorer Subagent:** Se dispara solo cuando comprender el problema requiere más de 10.000 tokens de lectura o más de 5 búsquedas secuenciales.
* **Parallel Writers:** Únicamente cuando existen 2 o más módulos completamente independientes con superficies de edición disjuntas.
* **Independent Verifier:** Se activa exclusivamente cuando el cambio toca un punto de **alto riesgo** (migraciones de datos, contratos de API públicos, auth o seguridad).

---

## Enlaces Oficiales y Recursos

* 🌐 [Sitio Web Oficial de Gentle-AI](https://gentle-ai.gentlemanprogramming.com/)
* 📦 [Repositorio en GitHub (Gentleman-Programming/gentle-shell)](https://github.com/Gentleman-Programming/gentle-shell)
* 📚 [Wiki de Gentle-AI](https://gentle-ai-wiki.gentlemanprogramming.com/)
* 📦 [Paquete en npm (gentle-pi v4.3.0)](https://www.npmjs.com/package/gentle-pi)
