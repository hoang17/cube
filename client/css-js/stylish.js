import { create } from 'jss'
import preset from 'jss-preset-default'
// import hash from 'murmurhash-js/murmurhash3_gc'
import { hashString as hash }  from './hash'
import merge from 'lodash/merge'
import omitBy from 'lodash/omitBy'
import { hyphenate } from '../plugins/helpers'

const prefix = 's'
const isNotFalsy = val => !!val
const generateClassName = (name, str) => `${name}${hash(str)}`
const mergeStyles = (style, rule) => merge(style, rule)
const isProd = process.env.NODE_ENV === 'production'

export default function stylish(sheetName, options) {
  const jss = create(preset())
  const renderSheet = (meta) => jss.createStyleSheet(null, {meta, link: true, ...options}).attach()

  let sheet = renderSheet(sheetName)

  function css(styles, className) {

    if (styles.constructor === Array) {
      // Filter falsy values to allow `css(a, test && c)`.
      styles = styles.filter(isNotFalsy)
      if (!styles.length) return ''
      styles = styles.reduce(mergeStyles, {})
    }

    const style = omitBy(styles, e => !e)

    // console.log(style);

    if (!className)
      className = generateClassName(prefix, JSON.stringify(style))

    let rule = sheet.getRule(className)

    // console.log(className, rule);

    if (!rule){
      // Devtool editable
      if (!isProd) {
        sheet.detach()
        rule = sheet.addRule(className, style, {selector: `.${className}`})
        sheet.attach()
        sheet.link()
      }
      // Devtool immutable
      else rule = sheet.addRule(className, style, {selector: `.${className}`})
      // rule = sheet.addRule(className, style, {selector: `.${className}`})
    }
    else
      updateRule(rule, style)

    return className
  }

  const updateRuleByName = (name, data) => {
    let rule = sheet.getRule(name)
    updateRule(rule, data)
  }

  const updateRule = (rule, data) => {
    if (rule.type === 'style') {
      for (const key in data) {
        // process pseudo selector eg: &:hover
        if (key.startsWith('&:')) {
          updateRuleByName('.'+rule.key+key.slice(1), data[key])
        }
        else {
          const prop = hyphenate(key)
          rule.prop(prop, data[key])
        }
      }
    }
    else if (rule.rules && rule.rules.index.length > 0) {
      let idx = rule.rules.index
      for (let i in idx) {
        updateRule(idx[i], data)
      }
    }
  }

  return css
}
