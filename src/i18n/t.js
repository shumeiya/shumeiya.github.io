// Bilingual copy, the whole site over.
//
// Every translatable string in /src/data is written as `tt("English", "中文")`,
// so the two languages sit side by side in the file you are editing rather than
// in a parallel key file that drifts out of sync. A wrapped string is just a
// marked object; `localize` walks a data tree and swaps each one for the plain
// string of the current language, which is why components downstream never need
// to know a second language exists — they still receive strings.
export const tt = (en, zh) => ({ __t: true, en, zh })

export const LANGS = ["en", "zh"]
export const DEFAULT_LANG = "en"

// One cache per language, keyed by the *source* object. Resolving a 2000-line
// case study on every scroll tick would be wasteful, and a fresh object each
// render would also break the effect dependencies that watch it — the cache
// keeps the resolved tree referentially stable for as long as the source is.
const caches = { en: new WeakMap(), zh: new WeakMap() }

export function localize(node, lang = DEFAULT_LANG) {
  if (node === null || typeof node !== "object") return node
  if (node.__t) return node[lang] ?? node[DEFAULT_LANG] ?? ""

  const cache = caches[lang] ?? (caches[lang] = new WeakMap())
  const hit = cache.get(node)
  if (hit !== undefined) return hit

  const out = Array.isArray(node) ? [] : {}
  // Seed the cache before recursing so a self-referencing tree can't loop.
  cache.set(node, out)
  if (Array.isArray(node)) {
    for (const item of node) out.push(localize(item, lang))
  } else {
    for (const [key, value] of Object.entries(node)) out[key] = localize(value, lang)
  }
  return out
}

// Chinese has no spaces, so a word-at-a-time reveal has nothing to split on and
// the whole line would arrive as one blob. Characters are the equivalent unit,
// and they are joined by nothing rather than by a space.
export function splitUnits(text) {
  if (!text) return { units: [], joiner: "" }
  if (/[\u3400-\u4dbf\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(text)) {
    return { units: Array.from(text), joiner: "" }
  }
  return { units: text.split(" "), joiner: " " }
}
