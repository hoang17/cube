var https = require('https')
var fs = require('fs')
var validator = require('validator')
// var download = require('download')
var { fonts } = require('../client/data/font-types')

// let download = (url) => {
//   let fname = url.split('/').pop()
//   var request = https.get(url, function(response) {
//     if (response.statusCode == 200){
//       var file = fs.createWriteStream('./css/' + fname)
//       response.pipe(file)
//     }
//   })
// }

fonts.map(category => {
  category.fonts.map(font => {

    var dir = `./css/${font.family}`

    if (!fs.existsSync(dir))
        fs.mkdirSync(dir)

    let download = (url) => {
      let fileName = url.split('/').pop()
      let filePath = `${dir}/${fileName}`
      if (fs.existsSync(filePath)) return
      var request = https.get(url, function(response) {
        if (response.statusCode == 200){
          var file = fs.createWriteStream(filePath)
          response.pipe(file)
        }
      })
    }

    // Download css
    if (font.url)
      download(font.url)

    // Download preview image
    download(font.R.url)
    if (font.ub)
      download(font.ub.url)

    // Download true type font (ttf)
    for (let j in font.i){
      let url = font.i[j]
      if (url && validator.isURL(url))
        download(url)
    }

    // Download web font (woff)
    for (let j in font.o)
      for (let k in font.o[j]){
        let url = font.o[j][k]+''
        if (url && validator.isURL(url))
          download(url)
      }
  })
})

// download = (fileName) => {
//   var request = https.get("https://static.canva.com/static/webfonts/" + fileName, function(response) {
//     if (response.statusCode == 200){
//       var file = fs.createWriteStream('./css/' + fileName)
//       response.pipe(file)
//     }
//   })
// }
//
// fonts.map(e => {
//   // let name = e.name.replace(/\s/g,'-')
//   let name = e.family.replace(' Thin','')
//   name = name.replace(' Light','')
//   name = name.replace(' Regular','')
//   name = name.replace(/\s/g,'')
//   let names = [
//     '',
//     '-Regular',
//     '-Bold',
//     '-BoldItalic',
//     '-Italic',
//     '-Light',
//     '-Thin',
//     '-LightItalic',
//     '-ThinItalic',
//     // 'Regular',
//     // 'Bold',
//     // 'BoldItalic',
//     // 'Italic',
//     // 'Light',
//     // 'Thin',
//     // 'LightItalic',
//     // 'ThinItalic',
//   ]
//
//   names.map(n => {
//     // download(name + n + '.woff')
//     // download(name + n + '.otf')
//     // download(name + n + '.svg')
//     // download(name + n + '.eot')
//     // download(name + n + '.ttf')
//     // download(name + n + '.woff2')
//   })
//
// })
