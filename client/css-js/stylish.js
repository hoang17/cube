import { create } from 'jss'
import preset from 'jss-preset-default'
import hash from 'murmurhash-js/murmurhash3_gc'

const meta = 'css'
const isNotFalsy = val => !!val
const getClassName = rule => rule.className
const generateClassName = (name, str) => `${name}-${hash(name + str + meta)}`
const mergeStyles = (style, rule) => ({...style, ...rule.style})

export default function stylish(jss, options) {
  const renderSheet = () => (
    jss.createStyleSheet(null, {meta, ...options}).attach()
  )

  let sheet = renderSheet()

  function css(...rules) {
    // Filter falsy values to allow `css(a, test && c)`.
    rules = rules.filter(isNotFalsy)

    if (!rules.length) return ''

    // A joined class name from all rules.
    const className = rules.map(getClassName).join('--')

    if (sheet.getRule(className)) return className

    const style = rules.reduce(mergeStyles, {})
    sheet.addRule(className, style, {selector: `.${className}`})

    return className
  }

  function createStyles(styles) {
    return Object.keys(styles).reduce((map, name) => {
      map[name] = {
        className: generateClassName(name, JSON.stringify(styles[name])),
        style: styles[name]
      }
      return map
    }, {})
  }

  function reset() {
    jss.removeStyleSheet(sheet)
    sheet = renderSheet()
  }

  return {
    createStyles,
    toString: () => sheet.toString(),
    css,
    reset,
  }
}

export const {css, createStyles, reset, toString} = stylish(create(preset()))
