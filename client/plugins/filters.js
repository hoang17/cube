import { truncate } from 'lodash'
import numeral from 'numeral'

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (t) {
  // let time = Date.parse(t)
  // let time = new Date(t)
  let time = new Date((t || "").replace(/-/g,"/").replace(/[TZ]/g," "))
  const between = Date.now() / 1000 - Number(time) / 1000
  if (between < 60) {
    return pluralize(~~(between), ' second')
  } else if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function cropUrl(str){
  if (str.length > 40) {
    return str.substr(0, 25) + '...' + str.substr(str.length-10, str.length)
  }
  return str
}

export function formatNumber(num){
  return numeral(num).format('0a')
}

export function cropTxt(txt, length = 300){
  return truncate(txt, {
      'length': length,
      'separator': /,? +/
    })
}
