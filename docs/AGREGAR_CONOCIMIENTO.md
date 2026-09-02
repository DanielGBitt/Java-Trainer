# Agregar conocimiento al juego

Este documento es la instrucción que la IA debe seguir cada vez que el usuario le pasa un nuevo bloque de conocimiento para practicar.

## 1. Lo que me pasarás tú (usuario)

- Curso: `intro-programacion` | `logica-programacion` | `bases-de-datos`
- Título tentativo del tema (ej: "Variables", "Entidad-Relación", "SELECT básico")
- Bloque bruto: apuntes, foto, pdf, resumen, o prompt libre
- (Opcional) Conceptos a cubrir si quieres limitar alcance (1–3)

## 2. Checklist obligatorio para la IA (no omitir pasos)

### 2.1 Normalizar conocimiento → `KnowledgeUnit`

- Crear id `"{curso}-{slug-kebab}"` (ej `intro-variable-concepto`, `bd-entidad`). Slug en minúsculas, sin acentos, sin `java-` legacy.
- `category` debe existir en `src/data/courses.ts` para ese curso; si es nueva, añadirla en `CATEGORY_LABELS/ORDER`.
- `knowledge: KnowledgeItem[]` mínimo 3 ítems en orden: 1× `definition` + 1× `rule` + 1× `example` (+ `comparison` si aplica). Cada `content` ≤ 25 palabras, español directo.
- Ejemplo base:
  ```ts
  { id:"bd-entidad", type:"definition", content:"Entidad = objeto del mundo real modelable (Cliente, Pedido) con identidad propia." }
  { id:"bd-entidad-rule", type:"rule", content:"Toda entidad lleva clave primaria única que la identifica (id)." }
  { id:"bd-entidad-ex", type:"example", content:"Cliente(id, nombre, email) → id=7 identifica a Ana." }
  ```

### 2.2 Registrar

- Añadir unit en `src/data/{intro,logica,bd}/knowledge.ts` (crear carpeta si no existe). Re-export shim `src/data/java/*` solo como alias para historial `localStorage`.
- Actualizar `src/data/{curso}/relationships.ts` con `prerequisite` / `related` hacia units previas del mismo curso.
- Actualizar `src/lib/constants.ts` si nueva `category`.
- Actualizar `src/data/courses.ts` `nodeIds` / `categories` del curso.

### 2.3 Ejercicios (3 por unit, obligatorios)

- `multiple_choice` `dimension: understanding` — debe discriminar distractor cercano (ej `camelCase` vs `snake_case` vs `kebab`).
- `recall` `dimension: recall` — `correctAnswer` corto (≤ 4 palabras o término). Añadir `alternativeAnswers` normalizadas (case/acento indiferente va por `grader.ts: normalizeAnswer` NFD).
- `code_completion` o `recall` `dimension: syntax|application` — snippet o gap. `codeSnippet` en mono.
- `explanation` ≤ 25 palabras, discriminativa ("SCREAMING_SNAKE_CASE para constantes, no snake_case"), nunca genérica "Parece que necesita refuerzo".
- `codeSnippet` y `correctAnswer` con formato mono esperado en `Feedback` (ve `src/components/exercises/Feedback.tsx`).

### 2.4 Mapa y posicionamiento

- `src/game/map/builder.ts` `buildGameMap(courseId)` filtra por curso. Cada curso tiene su propia grilla `x 150/400/650 y 60-440`. No tocar posiciones de otro curso.
- Verificar `ViewBox 0 0 800 580` + `foreignObject 150x90 x-75 y-45` (no recorta `GameNode`).
- Añadir conexión en `NODE_CONNECTIONS` si la unit tiene prerequisite.

### 2.5 QA obligatoria

```bash
npm run lint
npm run build # debe dar 6/6 rutas
# smoke manual:
# /c/{curso}/map carga sin recorte
# /c/{curso}/study/{nodeId} muestra Definición/Regla/Ejemplo con rail+icono+mono
# /c/{curso}/practice/{nodeId} incorrecto muestra "No era X — se esperaba Y." solo en recall/cc (<80 chars)
grep -R "Parece que|Confusión conceptual" src --include="*.ts" | wc -l # debe ser 0
```

## 3. Anti-patterns (no hacer)

- No crear `correctAnswer` frase larga que exija memorización literal sin `alternativeAnswers`.
- No usar lead genérico en `explanation` / `generateErrorFeedback`.
- No duplicar `correctAnswer` en `feedback` + línea aparte (dedup con `feedback.includes(correctAnswer)` en `Feedback.tsx`).
- No mezclar cursos: `bases-de-datos` nunca añade units a `intro-programacion`.

## 4. Definición de hecho

Se considera hecho cuando: Study distingue visualmente Definición/Regla/Ejemplo (`KnowledgeItemView` rail+icono), Practice muestra gap concreto, y `lint`/`build` pasan. Resto (convenciones, tipado) queda para siguiente lote.

## 5. Ejemplo completo (referencia)

Ver `src/data/java/exercises.ts` `const-recall-1` + `cc-recall-1` como gold standard de tono cercano breve + contraste.
