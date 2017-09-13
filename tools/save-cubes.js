const dotenv = require('dotenv')
const program = require('commander')
const { cloneDeep } = require('lodash')

dotenv.load({ path: '.env' })

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

// program
//   .version('0.0.1')
//   .option('-i, --id [id]', 'object id')
//   .parse(process.argv)
//
// const id = program.id

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const cubesCo = db.get('cubes')
const pagesCo = db.get('pages')

cubesCo.drop()

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

async function flattenCubes(){

  var getCubes = p => {
    if (!p.cubes) return []
    return p.cubes.reduce((a, cube) => {
      let c = cloneDeep(cube)
      cube._id = c._id = ObjectId()
      delete c.cubes
      return a.concat(c, getCubes(cube))
    }, [])
  }

  let pp = await pagesCo.find()
  let cc = pp.reduce((a, p) => {
    let c = getCubes(p)
    pagesCo.update({'_id': p._id }, p)
    return a.concat(c)
  }, [])

  console.log(cc.length)

  await cubesCo.insert(cc)
  db.close()

}

flattenCubes()
