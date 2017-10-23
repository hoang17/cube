const { map, fromPairs } = require('lodash')
const dotenv = require('dotenv')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const cubesCo = db.get('cubes')

const cubes = require('../client/data/cubes')

async function resetPages(){

  var updateCss = function(c){
    let cc = cubes[c.name.toLowerCase()]
    if (cc){
      c.order = cc.order
    }
    if (c.cubes){
      for (let i in c.cubes){
        updateCss(c.cubes[i])
      }
    }
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
