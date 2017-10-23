const { map, fromPairs } = require('lodash')
const dotenv = require('dotenv')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const dbpages = db.get('pages')
// const dbcubes = db.get('cubes')

function getPageBlocks(p){
  var getBlocks = cubes => {
    if (!cubes) return
    for (let i in cubes){
      let c = cubes[i]
      if (c.src){
        if (p.blocks[c.src]) p.blocks[c.src]++
        else p.blocks[c.src] = 1
      }
      if (c.cubes && c.cubes.length > 0)
        getBlocks(c.cubes)
    }
  }
  getBlocks(p.cubes)
}

async function resetPages(){
  let pp = await dbpages.find()
  for (let i in pp){
    let p = pp[i]
    p.blocks = {}
    getPageBlocks(p)
    await dbpages.update({'_id': p._id }, p)
  }
  db.close()
}

resetPages()
