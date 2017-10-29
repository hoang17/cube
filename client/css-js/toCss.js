/* @flow */
import toCssValue from './toCssValue'
// import isDynamicValue from './isDynamicValue'

/**
 * Indent a string.
 * http://jsperf.com/array-join-vs-for
 */
function indentStr(str, indent) {
  let result = ''
  for (let index = 0; index < indent; index++) result += '  '
  return result + str
}

/**
 * Converts a Rule to CSS string.
 */
export default function toCss(selector, style, options) {
  let result = ''

  if (!style) return result

  let {indent = 0} = options
  const {fallbacks} = style

  indent++

  // Apply fallbacks first.
  if (fallbacks) {
    // Array syntax {fallbacks: [{prop: value}]}
    if (Array.isArray(fallbacks)) {
      for (let index = 0; index < fallbacks.length; index++) {
        const fallback = fallbacks[index]
        for (const prop in fallback) {
          const value = fallback[prop]
          if (value != null) {
            result += `\n${indentStr(`${prop}: ${toCssValue(value)};`, indent)}`
          }
        }
      }
    }
    // Object syntax {fallbacks: {prop: value}}
    else {
      for (const prop in fallbacks) {
        const value = fallbacks[prop]
        if (value != null) {
          result += `\n${indentStr(`${prop}: ${toCssValue(value)};`, indent)}`
        }
      }
    }
  }

  let hasDynamicValue = false

  for (const prop in style) {
    let value = style[prop]
    // if (isDynamicValue(value)) {
    //   value = style[`$${prop}`]
    //   hasDynamicValue = true
    // }
    if (value != null && prop !== 'fallbacks') {
      result += `\n${indentStr(`${prop}: ${toCssValue(value)};`, indent)}`
    }
  }

  if (!result && !hasDynamicValue) return result

  indent--
  result = indentStr(`${selector} {${result}\n`, indent) + indentStr('}', indent)

  return result
}
