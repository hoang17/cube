import { create } from 'jss'
import preset from 'jss-preset-default'
// import hash from 'murmurhash-js/murmurhash3_gc'
import { hashString as hash }  from './hash'
import merge from 'lodash/merge'

const meta = 's'
const isNotFalsy = val => !!val
const getClassName = rule => rule.className
const generateClassName = (name, str) => `${name}${hash(str)}`
const mergeStyles = (style, rule) => merge(style, rule)

export default function stylish(jss, options) {
  const renderSheet = () => (
    jss.createStyleSheet(null, {meta, link: false, ...options}).attach()
  )

  let sheet = renderSheet()

  function css(...styles) {
    // Filter falsy values to allow `css(a, test && c)`.
    styles = styles.filter(isNotFalsy)

    if (!styles.length) return ''

    const style = styles.reduce(mergeStyles, {})

    const className = generateClassName(meta, JSON.stringify(style))

    if (sheet.getRule(className)) return className

    sheet.addRule(className, style, {selector: `.${className}`})

    return className
  }

  function reset() {
    jss.removeStyleSheet(sheet)
    sheet = renderSheet()
  }

  return {
    css,
    reset,
    toString: () => sheet.toString(),
  }
}

export const {css, reset, toString} = stylish(create(preset()))
