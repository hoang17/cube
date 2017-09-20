const { map, fromPairs } = require('lodash')
const dotenv = require('dotenv')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const pagesCo = db.get('pages')
const cubesCo = db.get('cubes')

// async function saveCubes(){
//
//   var flat = cc => {
//     cc.map(cube => {
//       let c = cloneDeep(cube)
//       c._id = ObjectId()
//       delete c.cubes
//       cubesCo.insert(c)
//       if (cube.cubes)
//         flat(cube.cubes)
//     })
//   }
//
//   let pp = await pagesCo.find()
//   pp.map(page => {
//     flat(page.cubes)
//   })
// }

function getPageBlocks(p){
  let blocks = {}
  var getBlocks = cubes => {
    if (!cubes) return
    for (let i in cubes){
      let c = cubes[i]
      if (c.src){
        if (blocks[c.src]) blocks[c.src]++
        else blocks[c.src] = 1
      }
      else if (c.cubes && c.cubes.length > 0)
        getBlocks(c.cubes)
    }
  }
  getBlocks(p.cubes)
  return blocks
}

async function getPageStyles(p){
  let data = await cubesCo.find()
  let cc = fromPairs(map(data, i => [i._id, i]))
  let styles = {}

  var getStyles = cubes => {
    for (let i in cubes){
      let c = cubes[i]
      if (c.css){
        if (styles[c.css]) styles[c.css]++
        else styles[c.css] = 1
      }
      if (c.src){
        let s = cc[c.src]
        if (s.css){
          if (styles[s.css]) styles[s.css]++
          else styles[s.css] = 1
        }
        if (s.cubes && s.cubes.length > 0)
          getStyles(s.cubes)
      }
      else if (c.cubes && c.cubes.length > 0)
        getStyles(c.cubes)
    }
  }

  getStyles(p.cubes)
  return styles
}

async function resetPages(){
  let pp = await pagesCo.find()
  for (let i in pp){
    let p = pp[i]
    p.blocks = getPageBlocks(p)
    p.styles = await getPageStyles(p)
    await pagesCo.update({'_id': p._id }, p)
  }
  db.close()
}

resetPages()
