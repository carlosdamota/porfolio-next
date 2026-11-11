---
title: "Guía Completa de Gentle-Shell y Gentle-AI: Instalación, ODD y Revisión Nativa"
slug: "instalacion-gentle-shell-gentle-ai"
description: "Manual actualizado (gentle-pi 4.7.0): instalación, atajos, modos de permisos, Organic Driven Development y revisión nativa con cuatro lentes sobre Pi."
category: "Ecosistema IA"
tags: ["Gentle-AI", "Gentle-Shell", "Pi Agent", "ODD", "RDD", "Dev Environment", "v4.7.0"]
date: "2026-10-19"
updatedAt: "2026-11-11"
author: "Carlos Damota"
readTime: "12 min de lectura"
---

# Guía de Gentle-Shell y Gentle-AI: Entorno de Desarrollo Agéntico

> **Versión de referencia:** paquete `gentle-pi` `4.7.0` (última publicada en npm), launcher `gentle-shell` `1.5.0`.
> **Requisitos mínimos:** Node.js `>= 22.19.0` y Pi `>= 1.2.0`.

En el desarrollo asistido por agentes autónomos, el cuello de botella rara vez es la capacidad del modelo para generar código: suele ser **la pérdida de contexto, la falta de control visual sobre lo que modifica y la ausencia de una metodología disciplinada** que evite romper código existente.

**Gentle-Shell** convierte el harness de terminal **Pi** en una estación de trabajo para dirigir agentes bajo **Organic Driven Development (ODD)**, con revisión de código nativa como segunda opinión obligatoria en los cambios de alto riesgo.

---

## Diferencias: ¿qué es cada componente?

* **Pi (`@earendil-works/pi-coding-agent`):** el runtime base y motor de ejecución en terminal.
* **Gentle-Shell:** el producto y launcher. Abre Pi con la interfaz TUI cargada: paneles laterales de estado, visor de diffs Git, tarjeta de subagentes, paleta de comandos y procesos en segundo plano. Su paquete npm sigue llamándose `gentle-pi` durante la transición de nombre.
* **Gentle-AI (`gentle-ai`):** binario nativo con versionado propio que gobierna el ciclo de vida: sincronización de assets, autoridad de revisión, inventario de skills y utilidades de repositorio. Su versión no tiene por qué coincidir con la del paquete npm; verifica siempre con `gentle-ai --version`.
* **el Gentleman:** el perfil de arquitecto senior que coordina las sesiones: conceptos antes de código, pruebas primero cuando aplica y justificación explícita antes de cada cambio.

---

## Instalación

### Recomendado: instalador en navegador

El instalador descarga Node.js, pnpm, Pi y Gentle Shell en un prefijo propio, y actualiza una instalación previa si la encuentra. No modifica nada hasta que confirmas el plan.

```bash
# macOS / Linux (desde un checkout del repositorio)
scripts/bootstrap.sh

# Windows
scripts\bootstrap.cmd
```

Abre un asistente en una dirección privada `127.0.0.1`. El enlace funciona una sola vez y caduca a los 2 minutos. En la pantalla de revisión puedes elegir:

* **Latest release (recomendada):** la versión publicada con su binario de Gentle AI fijado.
* **Latest main:** builds de desarrollo del último commit de `main`, compilados en tu equipo (requiere Go y pnpm).

### Ruta A: `gentle-shell` standalone (no toca tu Pi)

Instala el launcher de forma global. Usa su propio home en `~/.gentle-shell/agent` y guarda su configuración en `~/.gentle-shell/gentle-ai`, sin alterar tu instalación de Pi:

```bash
npm i -g gentle-pi

# Home aislado (por defecto)
gentle-shell

# Reutilizar tus logins, modelos y chats de Pi
gentle-shell --link

# Volver a aprovisionar el home por tu cuenta
gentle-shell setup
```

Para fijar `--link` como comportamiento por defecto, o mantener el home separado copiando solo credenciales y MCPs:

```bash
gentle-shell home link
gentle-shell home import-pi --dry-run
gentle-shell home import-pi
```

> [!TIP]
> `home import-pi` copia `auth.json` (con permisos `0600`) y `mcp.json`, más tu proveedor, modelo y nivel de razonamiento por defecto si el home nuevo no los tiene. Nunca sobrescribe archivos ni toca tu home de Pi. Contrapartida: `--link` comparte un único almacén de credenciales, mientras que `import-pi` crea una segunda copia, así que un proveedor que rota refresh tokens puede cerrar la sesión en una de las dos. En ese caso, vuelve a ejecutar `/login`.

### Ruta B: dentro de una instalación de Pi existente

```bash
# 1. Instalar el paquete en tu agente de Pi
pi install npm:gentle-pi

# Para una versión reproducible
pi install npm:gentle-pi@4.7.0

# 2. Reiniciar Pi y sincronizar assets (extensiones, themes, skills)
gentle-ai sync

# 3. Trabajar normalmente
pi
```

### Actualización y desinstalación

```bash
gentle-shell upgrade                     # actualiza Gentle Shell
gentle-shell upgrade --channel main      # builds de main (requiere Go y pnpm)
gentle-shell upgrade --rollback          # vuelve al par anterior verificado
gentle-shell update --extensions         # actualiza Pi y sus extensiones
gentle-shell self-uninstall --dry-run    # ver qué se eliminaría
gentle-shell self-uninstall              # eliminar Gentle Shell
```

`self-uninstall` conserva la configuración compartida de Gentle AI en `~/.pi/gentle-ai` salvo que pases `--include-shared`, y no toca tu home de Pi.

---

## Verificación de salud del entorno

Dentro de la terminal interactiva:

```text
/gentle:status   # versión activa, perfil de modelo, modo de permisos y estado de contexto
/gentle:doctor   # audita herramientas locales, Git, MCPs y permisos
/gentle:usage    # medidores de uso y suscripciones
```

---

## Atajos de teclado

Gentle-Shell dota a la terminal de capacidades visuales para no salir a otra pestaña:

| Atajo | Función |
| :--- | :--- |
| **`alt + g`** | **Gentle Changes:** visor de diffs a pantalla completa, dos paneles, con recuento de líneas por archivo e inclusión de worktrees. |
| **`alt + a`** | **Gentle Agents:** monitor de subagentes con hilos retenidos, métricas de tokens, coste y tiempo. |
| **`alt + k`** | **Command Palette:** menú agrupado y curado (Configuration, Session, Diagnostics, Skills) con búsqueda. |
| **`alt + s`** | Detiene los subagentes activos o en cola que pertenecen a la sesión. |
| **`alt + l`** | Cicla los presets visuales Light → Neutral → Power user. |
| **`alt + e`** | Selecciona el borrador completo del editor. |
| **`ctrl + shift + t`** | Colapsa la tarjeta de tareas a una sola línea. |
| **`ctrl + shift + a`** | Colapsa o expande la tarjeta de agentes. |
| **`ctrl + shift + j`** | Colapsa la tarjeta de jobs en segundo plano. |

> [!NOTE]
> `ctrl + k` no se usa: Pi lo reserva para el editor. Por eso la paleta es `alt + k`, y los atajos que chocan con acciones de Pi se rechazan explícitamente.

---

## Comandos principales

Todos se invocan como `/gentle:<nombre>` dentro de la sesión.

### Sesión y trabajo

| Comando | Función |
| :--- | :--- |
| `/gentle:changes` | Visor de cambios Git (equivale a `alt + g`). |
| `/gentle:agents` | Panel de subagentes (equivale a `alt + a`). |
| `/gentle:jobs` | Inspección, logs y detención de procesos en segundo plano. |
| `/gentle:background-subagents` | Política de subagentes en segundo plano. |
| `/gentle:scratch` | Notas temporales de trabajo. |
| `/gentle:commands` | Paleta de comandos. |
| `/gentle:guide` | Tour guiado de la interfaz, paso a paso. |
| `/gentle:panel` | Disposición y visibilidad del panel lateral. |

### Modelos y perfiles

| Comando | Función |
| :--- | :--- |
| `/gentle:profiles` | Perfiles de modelo y enrutamiento por rol. Reemplaza al retirado `/gentle:models`. |
| `/gentle:persona` | Modo de identidad del agente. |
| `/gentle:usage` | Medidores de suscripción y consumo. |
| `/gentle:stats` | Métricas locales: mapa de calor, historial, tokens por modelo. |

### Permisos y revisión

| Comando | Función |
| :--- | :--- |
| `/gentle:mode` | Selecciona o consulta el modo de permisos de la sesión. |
| `/gentle:yolo` | Selector interactivo de modo YOLO / Super Yolo. |
| `/gentle:rdd` | Estado y alcance de Receipt-Driven Development. |
| `/gentle:review-mode` | Interruptor de revisión con alcance de clon. |

### Diseño, audio y diagnóstico

| Comando | Función |
| :--- | :--- |
| `/gentle:design` | Canvas de diseño: briefs, artboards HTML, comentarios y sistema de diseño. |
| `/gentle:music` | Reproductor de música integrado. |
| `/gentle:voice` | Dictado local por voz. |
| `/gentle:status` / `/gentle:doctor` | Estado del entorno y auditoría de dependencias. |
| `/gentle:telemetry` | Telemetría anónima: estado, activación, desactivación y previsualización del payload. |
| `/gentle:customize` | Personalización de la TUI: temas, barra, editor, transparencia, animaciones y modo Vim. |

---

## Modos de permisos (control frente a autonomía)

| Modo | Comportamiento |
| :--- | :--- |
| **Normal** | Comportamiento por defecto. Las confirmaciones de comandos guardados ofrecen opciones acotadas: **Allow once**, **Allow for this session** y **Always allow \<familia\>**, además de **Deny**. |
| **Auto** | Un revisor independiente, con el modelo de la sesión, comprueba cada acción elegible contra la intención vigente del usuario antes de ejecutarla. |
| **YOLO** | Permiso permanente para trabajo ya autorizado y para el delivery ordinario, sin clasificador Auto. Las acciones destructivas y los límites de consentimiento independientes se mantienen. |
| **Super Yolo** | Sin preguntas de permiso, incluidas las confirmaciones de pérdida de datos. Solo queda la guarda de rutas sensibles (`.env`, `.ssh`, llaveros, `*.pem`/`*.key`/`*.p12`, `secrets/`, credenciales cloud) y las denegaciones catastróficas a nivel de código (`rm -rf /`, `--no-preserve-root`, `git reset --hard`, clean forzado, force push). |

```text
/gentle:mode normal | auto | yolo | super-yolo   # solo esta sesión
/gentle:mode status                              # modo actual y default guardado
/gentle:mode default auto                        # default para sesiones nuevas
```

> [!IMPORTANT]
> Cambiar el default **no** cambia la sesión actual. Los hijos de paquete no heredan el modo elevado del padre: mantienen su delegación acotada y sus rutas de seguridad.

---

## La metodología ODD (Organic Driven Development)

ODD no es opcional: cada petición entra en el flujo, sin que tengas que pedirlo.

```
[1. Authorize] ─► [2. Explore] ─► [3. Resolve] ─► [4. Classify]
                                                        │
                     ┌──────────────────────────────────┘
                     ▼
        ¿Tarea pequeña o grande? (test de reanudación)
        ├── Pequeña: inline en el hilo principal, RED ──► GREEN ──► Refactor
        └── Grande:  [5. Track] ──► odd/tasks/<feature>.md + espejo en memoria
                                        │
                                        ▼
                               [6. Implement] ──► commits por unidad de trabajo
                                        │
                                        ▼
                               [7. Close]     ──► resultado verificado + Risk line
```

* **Authorize:** investigación, explicación, revisión y propuestas son de solo lectura. Nada se escribe hasta que el cambio está autorizado.
* **Classify:** el tamaño se decide por el **test de reanudación** (¿otra persona podría terminar el trabajo solo con la petición original y `git diff`?), nunca por número de archivos o de tests.
* **Track:** solo para tareas grandes, antes de la primera escritura: documento de feature, espejo en memoria y lista visible de tareas.
* **Implement:** una tarea cada vez, con TDD cuando hay tests deterministas aplicables y commits por unidad de trabajo de unas 400 líneas cambiadas.
* **Close:** se reporta el resultado verificado, los checks fallidos o pendientes, y una línea `Risk`.

### Delegación proporcional

El error más común al usar agentes es lanzar subagentes para tareas diminutas o sobrecargar al hilo principal con lecturas de decenas de miles de tokens:

* **Inline:** tareas entendidas cuyo diff se reanuda desde la petición y el diff.
* **Explorer:** se dispara cuando comprender el problema excede un lote acotado de lecturas (más de ~3 llamadas o ~10k tokens) o más de ~5 búsquedas secuenciales.
* **Parallel writers:** solo con dos o más unidades independientes de comportamiento y superficies de edición disjuntas.
* **Independent verifier:** solo cuando el cambio toca un punto de alto riesgo: datos irrecuperables, seguridad, contratos que otros consumen, concurrencia, delivery o ausencia de test que detecte la regresión.

Cada cambio cierra con su línea de riesgo (`Risk: none` o `Risk: item N`), y cualquier item activa verificación independiente.

---

## Revisión nativa (RDD)

RDD (**Receipt-Driven Development**) es el sistema de revisión por autoridad nativa. Es opcional y viene activado por defecto.

* **Interruptor propio:** `/gentle:rdd` muestra el modo efectivo y su origen, y permite elegir un cambio de repositorio o uno explícito de máquina. `/gentle:review-mode status|enable|disable` sigue teniendo alcance de clon. Cambiar RDD no otorga consentimiento de revisión ni cambia permisos.
* **Candidato:** el commit de una unidad de trabajo o el slice de un PR, nunca la rama acumulada completa.
* **Evaluación:** cada candidato se clasifica por riesgo. Lo pasivo y lo bajo no genera ceremonia; lo medio se difiere al slice; lo **alto** se revisa de inmediato.
* **Cuatro lentes independientes:** `risk` (datos, credenciales, permisos, contratos), `resilience` (fallos, reintentos, concurrencia), `readability` (API, mensajes, documentación) y `reliability` (lógica que los tests deben fijar). El agente elige solo las pertinentes y explica por qué.
* **Consentimiento por candidato:** la TUI muestra las opciones del candidato y, aparte, una acción de host para permitir las revisiones de toda la sesión de Pi. Se concede por selección humana directa y vive solo en memoria del proceso.
* **Sin entrega:** la revisión nunca hace commit, push, PR ni release. Un resultado `approved` cierra la autoridad de revisión y el delivery sigue las reglas normales del repositorio.

Solo bloquean los hallazgos graves causados por el candidato; lo preexistente queda como seguimiento.

---

## Novedades frente a la guía anterior

Si llegaste a esta página cuando documentaba la `v4.3.0`, estos son los cambios que más afectan al uso diario:

* **Gentle Design:** `/gentle:design` escribe briefs y artboards HTML autocontenidos en `design/<slug>/`, con comentarios sobre el canvas y sistema de diseño (`design/system.md`).
* **Gentle Music y Gentle Voice:** reproductor integrado y dictado local por voz.
* **Tour guiado:** `/gentle:guide` explica la interfaz paso a paso, sin salir de la sesión.
* **Perfiles de modelo:** `/gentle:profiles` sustituye a `/gentle:models`, con cadenas de fallback por perfil y pines por repositorio.
* **Super Yolo:** cuarto modo de permisos, sin confirmaciones salvo la guarda de rutas sensibles.
* **RDD con consentimiento por candidato** y cuatro lentes en lugar del modelo anterior de revisión única.
* **Instalación empaquetada:** instalador en navegador, `upgrade` con canales y rollback, y `self-uninstall`.
* **Proveedor NaN** como proveedor de primera parte, junto a los ya soportados.
* **Telemetría anónima opt-out** con previsualización exacta del payload antes de enviarlo.

---

## Enlaces oficiales y recursos

* 🌐 [Sitio web oficial de Gentle-AI](https://gentle-ai.gentlemanprogramming.com/)
* 📦 [Repositorio en GitHub](https://github.com/Gentleman-Programming/gentle-shell)
* 🏷️ [Releases y notas de versión](https://github.com/Gentleman-Programming/gentle-shell/releases)
* 📚 [Wiki de Gentle-AI](https://gentle-ai-wiki.gentlemanprogramming.com/)
* 📦 [Paquete en npm (`gentle-pi`)](https://www.npmjs.com/package/gentle-pi)
