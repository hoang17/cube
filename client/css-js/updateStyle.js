import { camelize } from '../plugins/helpers'

export const updateStyle = (rule, data) => {
  if (rule.type === 'style') {
    for (const prop in rule.style) {
      // const value = rule.style[prop]
      // if (typeof value === 'function') {
      //   rule.prop(prop, value(data))
      // }
      // if ()
      // console.log(data[prop]);
      const key = camelize(prop)
      rule.prop(prop, data[key])
    }
  }
  else if (rule.rules && rule.rules.index.length > 0) {
    let indexes = rule.rules.index
    for (let index = 0; index < indexes.length; index++) {
      updateStyle(indexes[index], data)
    }
  }
}
