var fs = require('fs')
var validator = require('validator')
var { fonts } = require('../client/data/font-types')

let ff = {}
let tt = []

fonts.map(type => {
  let t = { name: type.se, fonts: [] }
  type.fonts.map(font => {
    let css = font.url ? font.url.split('/').pop() : undefined
    let f = {
      family: font.family,
      displayName: font.displayName,
      css: css,
      png: font.R.url.split('/').pop(),
      // type: type.se,
    }
    ff[font.family] = css
    t.fonts.push(f)
  })
  tt.push(t)
})

fs.writeFileSync('./data.js', JSON.stringify(ff, null, 2) , 'utf-8');
