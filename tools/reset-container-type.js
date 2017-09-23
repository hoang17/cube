const dotenv = require('dotenv')
dotenv.load({ path: '.env' })
const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const dbpages = db.get('pages')
const dbcubes = db.get('cubes')

async function updateCubes(){

  var update = function(c){
    if (c.type == 'block')
      c.type = 'bk'
    if (c.cubes){
      for (let i in c.cubes){
        update(c.cubes[i])
      }
    }
  }

  let pp = await dbpages.find()
  for (let i in pp){
    let p = pp[i]
    update(p)
    await dbpages.update({'_id': p._id }, p)
  }

  let cc = await dbcubes.find()
  for (let i in cc){
    let c = cc[i]
    update(c)
    await dbcubes.update({'_id': c._id }, c)
  }

  db.close()
}

updateCubes()
