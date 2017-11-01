import isObject from 'lodash/isObject'
import omitBy from 'lodash/omitBy'
import mapValues from 'lodash/mapValues'

export function $(selector) {
  if (typeof selector !== "string") {
    return selector
  }
  return document.querySelector(selector)
}
export function on(element, events, handler) {
  if (!(events instanceof Array)) {
    events = [events]
  }
  for (let i = 0; i < events.length; i++) {
    element.addEventListener(events[i], handler)
  }
}
export function off(element, events, handler) {
  if (!(events instanceof Array)) {
    events = [events]
  }
  for (let i = 0; i < events.length; i++) {
    element.removeEventListener(events[i], handler)
  }
}

export function cumulativeOffset(element) {
  let top = 0
  do {
      top += element.offsetTop || 0;
      element = element.offsetParent;
  } while (element)
  return { top: top }
}

/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /([^-])([A-Z])/g
export const hyphenate = cached(str => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})

/**
 * Generate style string from style object
 */
export function genStyle (style) {
  let styleText = ''
  for (const key in style) {
    const value = style[key]
    if (!value) continue
    const hyphenatedKey = hyphenate(key)
    if (Array.isArray(value)) {
      for (let i = 0, len = value.length; i < len; i++) {
        styleText += `${hyphenatedKey}:${value[i]};`
      }
    } else {
      styleText += `${hyphenatedKey}:${value};`
    }
  }
  return styleText
}

// Get style rules from array of style
export function getRules(cubes){
  let rules = ''
  for (let i in cubes){
    let e = cubes[i]
    let s = genStyle(e.style)
    rules += `.--${e._id}{${s}}`
  }
  return rules
}

export function getFonts(cubes, page){
  let fonts = []
  for (let i in cubes) {
    let f = cubes[i].style.fontFamily
    if (f) fonts.push(f)
  }
  if (page.fonts)
    for (let f in page.fonts)
      if (!fonts.includes(f)) fonts.push(f)
  return fonts
}

export function omitByDeep(value, iteratee) {
  return isObject(value)?
    mapValues(omitBy(value, iteratee), v => omitByDeep(v, iteratee))
    : value
}
