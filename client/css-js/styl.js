import { create } from 'jss'
import preset from 'jss-preset-default'
import { hashString as hash }  from './hash'
import merge from 'lodash/merge'
import omitBy from 'lodash/omitBy'

const prefix = 's'
const isNotFalsy = val => !!val
const generateClassName = (name, str) => `${name}${hash(str)}`
const mergeStyles = (style, rule) => merge(style, rule)

export function stylish(jss, options) {
  const renderSheet = meta => jss.createStyleSheet(null, {meta, link: false, ...options})

  function css(styles, name) {
    let sheet = renderSheet(name)

    // Filter falsy values to allow `css(a, test && c)`.
    styles = styles.filter(isNotFalsy)

    if (!styles.length) return ''

    const style = omitBy(styles.reduce(mergeStyles, {}), e => !e)

    const className = name ? name : generateClassName(prefix, JSON.stringify(style))

    let rule = sheet.getRule(className)

    if (!rule)
      rule = sheet.addRule(className, style, {selector: `.${className}`})

    return sheet
  }

  return css
}

const css = stylish(create(preset()))

export default css
