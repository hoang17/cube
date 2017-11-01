import { create } from 'jss'
import preset from 'jss-preset-default'
// import hash from 'murmurhash-js/murmurhash3_gc'
import { hashString as hash }  from './hash'
import merge from 'lodash/merge'
import isNil from 'lodash/isNil'
import { hyphenate, omitByDeep } from '../plugins/helpers'

const prefix = 's'
const isNotFalsy = val => !!val
const generateClassName = (name, str) => `${name}${hash(str)}`
const mergeStyles = (style, rule) => merge(style, rule)
const isProd = process.env.NODE_ENV === 'production'

export default function stylish(sheetName, options) {
  const jss = create(preset())
  const renderSheet = (meta) => jss.createStyleSheet(null, {meta, link: true, ...options}).attach()

  var sheet = renderSheet(sheetName)

  function css(style, className) {

    if (style.constructor === Array) {
      // Filter falsy values to allow `css(a, test && c)`.
      style = style.filter(isNotFalsy)
      if (!style.length) return ''
      style = style.reduce(mergeStyles, {})
    }

    if (!className)
      className = generateClassName(prefix, JSON.stringify(style))

    let rule = sheet.getRule(className)

    // console.log(className, rule);

    // *** UPDATE or ADD MODE ***
    // if (rule)
    //   updateRule(rule, style)
    // else
    //   addRule(className, style)

    // *** DELETE & ADD MODE ***
    if (rule)
      deleteRule(className, style)
    addRule(className, style)

    return className
  }

  function deleteRule(name, style) {
    sheet.deleteRule(name)
    for (var key in style)
      if (key.startsWith('&'))
        sheet.deleteRule('.'+name+key.slice(1))
  }

  function addRule(name, style) {
    const data = omitByDeep(style, isNil)
    // Devtool immutable
    if (isProd)
      return sheet.addRule(name, data, {selector: `.${name}`})
    // Devtool editable
    else {
      sheet.detach()
      let rule = sheet.addRule(name, data, {selector: `.${name}`})
      sheet.attach()
      sheet.link()
      return rule
    }
    // return sheet.addRule(name, data, {selector: `.${name}`})
  }

  function updateRuleByName(name, style) {
    let rule = sheet.getRule(name)
    updateRule(rule, style)
  }

  function updateRule(rule, style) {
    if (rule.type === 'style') {
      for (var key in style) {
        // process pseudo selector eg: &:hover
        if (key.startsWith('&'))
          updateRuleByName('.'+rule.key+key.slice(1), style[key])
        else {
          const prop = hyphenate(key)
          // rule.prop(prop, style[key])
          // console.log(prop, style[key]);
          // console.log(rule.renderable);
          rule.renderer.setStyle(rule.renderable, prop, style[key])
        }
      }
    }
    else if (rule.rules && rule.rules.index.length > 0) {
      let idx = rule.rules.index
      for (let i in idx) {
        updateRule(idx[i], style)
      }
    }
  }

  function reset() {
    jss.removeStyleSheet(sheet)
    sheet = renderSheet()
  }

  return {
    css,
    toString: () => {
      let s = sheet.toString()
      reset()
      return s
    }
  }
}

export const { css, toString } = stylish()
