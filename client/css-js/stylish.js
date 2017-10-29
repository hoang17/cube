import { create } from 'jss'
import { updateStyle } from './updateStyle'
import preset from 'jss-preset-default'
// import hash from 'murmurhash-js/murmurhash3_gc'
import { hashString as hash }  from './hash'
import merge from 'lodash/merge'

const meta = 's'
const isNotFalsy = val => !!val
const getClassName = rule => rule.className
const generateClassName = (name, str) => `${name}${hash(str)}`
const mergeStyles = (style, rule) => merge(style, rule)
const isProd = process.env.NODE_ENV === 'production'

export default function stylish(jss, options) {
  const renderSheet = () => jss.createStyleSheet(null, {meta, link: true, ...options}).attach()

  let sheet = renderSheet()

  function css(styles, name) {
    // Filter falsy values to allow `css(a, test && c)`.
    styles = styles.filter(isNotFalsy)

    if (!styles.length) return ''

    const style = styles.reduce(mergeStyles, {})

    const className = name ? name : generateClassName(meta, JSON.stringify(style))

    // if (sheet.getRule(className)) return className

    // let rule
    //
    // if (!isProd) {
    //   // Devtool editable
    //   sheet.detach()
    //   rule = sheet.addRule(className, style, {selector: `.${className}`})
    //   sheet.attach()
    //   sheet.link()
    // } else {
    //   // Devtool immutable
    //   rule = sheet.addRule(className, style, {selector: `.${className}`})
    // }

    let rule = sheet.addRule(className, style, {selector: `.${className}`})

    // console.log(rule);
    
    return rule
  }

  function reset() {
    jss.removeStyleSheet(sheet)
    sheet = renderSheet()
  }

  return {
    update: updateStyle,
    sheet,
    css,
    reset,
    toString: () => sheet.toString(),
  }
}

export const { update, sheet, css, reset, toString} = stylish(create(preset()))
