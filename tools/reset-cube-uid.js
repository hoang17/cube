const { map, fromPairs } = require('lodash')
const dotenv = require('dotenv')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const dbpages = db.get('pages')
const dbcubes = db.get('cubes')
const dbstyles = db.get('styles')

async function resetPages(){

  let uid = null

  var update = function(c){
    if (!c.uid) c.uid = uid
    if (c.cubes){
      for (let i in c.cubes){
        update(c.cubes[i])
      }
    }
  }

  let pp = await dbpages.find()
  for (let i in pp){
    let p = pp[i]
    uid = p.uid
    update(p)
    await dbpages.update({'_id': p._id }, p)
  }

  let cc = await dbcubes.find()
  for (let i in cc){
    let c = cc[i]
    update(c)
    await dbcubes.update({'_id': c._id }, c)
  }

  let ss = await dbstyles.find()
  for (let i in ss){
    let e = ss[i]
    if (!e.uid) e.uid = uid
    await dbstyles.update({'_id': e._id }, e)
  }

  db.close()
}

resetPages()
