# Agregar conocimiento al juego

Este documento es la instrucción que la IA debe seguir cada vez que el usuario le pasa un nuevo bloque de conocimiento para practicar.

## 1. Lo que me pasarás tú (usuario)

- Curso: `intro-programacion` | `logica-programacion` | `bases-de-datos`
- Título tentativo del tema (ej: "Variables", "Entidad-Relación", "SELECT básico")
- Bloque bruto: apuntes, foto, pdf, resumen, o prompt libre
- (Opcional) Conceptos a cubrir si quieres limitar alcance (1–3)

## 2. Checklist obligatorio para la IA (no omitir pasos)

### 2.1 Normalizar conocimiento → `KnowledgeUnit`

- Nuevo contenido usa prefijo del curso: `intro-{slug}`, `logica-{slug}`, `bd-{slug}` (ej `intro-variable-concepto`, `logica-op-modulo`, `bd-entidad`). Slug en minúsculas, sin acentos. `java-{slug}` queda solo por compat historial de Lógica (`java-op-aritmeticos`, `java-not` etc. aún vivos en `src/data/logica-programacion/knowledge.ts`); no crear nuevos `java-`.
- `category` debe existir en `src/data/courses.ts` para ese curso; si es nueva, añadirla en `CATEGORY_LABELS/ORDER` (`src/lib/constants.ts`). `intro` y `bases-de-datos` hoy tienen `categories: []` (Próximamente) hasta primer aporte.
- `knowledge: KnowledgeItem[]` mínimo 3 ítems en orden: 1× `definition` + 1× `rule` + 1× `example` (+ `comparison` si aplica). Cada `content` ≤ 25 palabras, español directo.
- Ejemplo base:
  ```ts
  { id:"bd-entidad", type:"definition", content:"Entidad = objeto del mundo real modelable (Cliente, Pedido) con identidad propia." }
  { id:"bd-entidad-rule", type:"rule", content:"Toda entidad lleva clave primaria única que la identifica (id)." }
  { id:"bd-entidad-ex", type:"example", content:"Cliente(id, nombre, email) → id=7 identifica a Ana." }
  ```

### 2.2 Registrar

| Curso | Knowledge | Ejercicios | Relaciones |
|-------|-----------|------------|------------|
| `intro-programacion` | `src/data/intro-programacion/knowledge.ts` → `introProgramacionUnits` | `src/data/intro-programacion/exercises.ts` → `introProgramacionExercises` | `src/data/intro-programacion/relationships.ts` |
| `logica-programacion` | `src/data/logica-programacion/knowledge.ts` → `logicaProgramacionUnits` | `src/data/logica-programacion/exercises.ts` → `logicaProgramacionExercises` | `src/data/logica-programacion/relationships.ts` |
| `bases-de-datos` | `src/data/bases-de-datos/knowledge.ts` → `basesDeDatosUnits` | `src/data/bases-de-datos/exercises.ts` → `basesDeDatosExercises` | `src/data/bases-de-datos/relationships.ts` |

- No tocar `src/data/java/*` (archivo muerto, historial `localStorage`). El agregador canónico es `src/engine/learning/knowledge.ts` (`[...intro, logica, bd]`) y `src/engine/adaptive/selector.ts` (idem ejercicios).
- Si el curso aún está vacío (0 nodos), el mapa `/c/{curso}/map` muestra Próximamente hasta el primer aporte — no crear placeholder ficticio; descomenta plantilla en `builder.ts`.
- Actualizar `src/data/{curso}/relationships.ts` con `prerequisite` / `related` hacia units previas del mismo curso.
- Actualizar `src/lib/constants.ts` si nueva `category`.
- Actualizar `src/data/courses.ts` `categories` del curso (no `nodeIds` — campo eliminado; señal de vacío es `buildGameMap(courseId).length===0`). Navbar y dashboard leen `COURSE_ORDER`; nuevo curso aparece auto en `Materias` y `Inicio` sin tocar `layout`.

### 2.3 Ejercicios (3 por unit, obligatorios) → `src/data/{curso}/exercises.ts`

- `multiple_choice` `dimension: understanding` — debe discriminar distractor cercano (ej `camelCase` vs `snake_case` vs `kebab`).
- `recall` `dimension: recall` — `correctAnswer` corto (≤ 4 palabras o término). Añadir `alternativeAnswers` normalizadas (case/acento indiferente va por `grader.ts: normalizeAnswer` NFD).
- `code_completion` o `recall` `dimension: syntax|application` — snippet o gap. `codeSnippet` en mono.
- `explanation` ≤ 25 palabras, discriminativa ("SCREAMING_SNAKE_CASE para constantes, no snake_case"), nunca genérica "Parece que necesita refuerzo".
- `codeSnippet` y `correctAnswer` con formato mono esperado en `Feedback` (ve `src/components/exercises/Feedback.tsx`).

### 2.4 Mapa y posicionamiento

- `src/game/map/builder.ts` `buildGameMap(courseId)` filtra por curso. Cada curso tiene su propia grilla `x 150/400/650 y 60-440`. **Hoy solo Lógica tiene nodos activos** `node-operators (400,160)` → `node-logic (400,320)`; Intro y BD son `/* PLANTILLA ... */` comentadas que se descomentan al recibir primer aporte de ese curso. No tocar posiciones de otro curso.
- Verificar `ViewBox 0 0 800 580` + `foreignObject 150x90 x-75 y-45` (no recorta `GameNode`).
- Añadir conexión en `NODE_CONNECTIONS` plantilla correspondiente si la unit tiene prerequisite (descomenta línea de plantilla).

### 2.5 QA obligatoria

```bash
npm run lint
npm run build # debe dar 8/8 rutas (/, /map redirect, /c/[courseId]/map|study|practice, /practice|study/[nodeId], /progress)
# smoke manual:
# /c/logica-programacion/map → 2 nodos sin recorte
# /c/intro-programacion/map y /c/bases-de-datos/map → Próximamente (vacío, sin WorldMap)
# /c/{curso}/study/{nodeId} muestra Definición/Regla/Ejemplo con rail+icono+mono
# /c/{curso}/practice/{nodeId} incorrecto muestra "No era X — se esperaba Y." solo en recall/cc (<80 chars)
grep -R "Parece que|Confusión conceptual" src --include="*.ts" | wc -l # debe ser 0
```

## 3. Anti-patterns (no hacer)

- No crear `correctAnswer` frase larga que exija memorización literal sin `alternativeAnswers`.
- No usar lead genérico en `explanation` / `generateErrorFeedback`.
- No duplicar `correctAnswer` en `feedback` + línea aparte (dedup con `feedback.includes(correctAnswer)` en `Feedback.tsx`).
- No mezclar cursos: `bases-de-datos` nunca añade units a `intro-programacion`.
- No añadir `nodeIds` a `courses.ts` (campo eliminado) ni tocar `src/data/java/*`.

## 4. Definición de hecho

Se considera hecho cuando: `/c/{curso}/map` aísla su materia, Study distingue visualmente Definición/Regla/Ejemplo (`KnowledgeItemView` rail+icono), Practice muestra gap concreto, y `lint`/`build` 8/8 pasan.

## 5. Ejemplo completo (referencia)

Ver `src/data/logica-programacion/exercises.ts` (`arith-recall-1`, `not-recall-1`, `mod-cc-1`) y `src/data/bases-de-datos/knowledge.ts` vacío como gold standard de tono cercano breve + contraste (intro bloqueado en `src/data/java/exercises.ts` `const-recall-1` queda como legado, no usar para nuevo contenido).
