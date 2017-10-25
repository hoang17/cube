const { map, fromPairs } = require('lodash')
const dotenv = require('dotenv')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const dbpages = db.get('pages')
const dbcubes = db.get('cubes')

function key(array){
  return fromPairs(map(array, i => [i._id, i]))
}

function getCubeBlocks(cube, list){
  let blocks = {}
  var getBlocks = cubes => {
    if (!cubes) return
    for (let i in cubes){
      let c = cubes[i]
      if (c.src){
        if (blocks[c.src]) blocks[c.src]++
        else blocks[c.src] = 1
      }

      if (c.name == 'Block'){
        let s = list[c.src]
        if (s.src){
          if (blocks[s.src]) blocks[s.src]++
          else blocks[s.src] = 1
        }
        if (s.cubes) getBlocks(s.cubes)
      }

      if (c.cubes && c.cubes.length > 0)
        getBlocks(c.cubes)
    }
  }
  if (cube.src)
    blocks[cube.src] = 1

  if (cube.name == 'Block'){
    let s = list[cube.src]
    if (s.src){
      if (blocks[s.src]) blocks[s.src]++
      else blocks[s.src] = 1
    }
    if (s.cubes) getBlocks(s.cubes)
  }

  getBlocks(cube.cubes)
  return blocks
}

async function resetPages(){
  let cc = await dbcubes.find()
  let cubes = key(cc)
  let pp = await dbpages.find()
  for (let i in pp){
    let p = pp[i]
    p.blocks = getCubeBlocks(p, cubes)
    await dbpages.update({'_id': p._id }, p)
  }
  db.close()
}

resetPages()
