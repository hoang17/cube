const { map, fromPairs } = require('lodash')
const dotenv = require('dotenv')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const pagesCo = db.get('pages')
const cubesCo = db.get('cubes')

const cubes = require('../client/data/cubes')

async function resetPages(){

  var updateCss = function(c){
    if (!c.icon && cubes[c.name.toLowerCase()]){
      c.icon = cubes[c.name.toLowerCase()].icon
    }
    if (c.cubes){
      for (let i in c.cubes){
        updateCss(c.cubes[i])
      }
    }
  }

  let pp = await pagesCo.find()
  for (let i in pp){
    let p = pp[i]
    updateCss(p)
    await pagesCo.update({'_id': p._id }, p)
  }

  let cc = await cubesCo.find()
  for (let i in cc){
    let c = cc[i]
    updateCss(c)
    await cubesCo.update({'_id': c._id }, c)
  }

  db.close()
}

resetPages()
