import generate from 'nanoid/generate'
import cloneDeep  from 'lodash/cloneDeep'
import reduce  from 'lodash/reduce'
import Vue from 'vue'

export const bus = new Vue()

export const NanoId = (length = 10) => generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length)

export const NanoSlug = (length = 6) => generate('0123456789abcdefABCDEF', length)

export const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export function clone(cube, uid){
  const id = c => {
    c._id = ObjectId()
    c.uid = uid
    if (c.cubes)
      for (let i in c.cubes)
        id(c.cubes[i])
  }
  let clone = cloneDeep(cube)
  id(clone)
  return clone
}

export function indexCubes(pages){
  let getCubes = p => {
    if (!p.cubes) return {}
    return reduce(p.cubes, (a, cube) => {
      let cc = {}
      cc[cube._id] = cube
      return {...a, ...cc, ...getCubes(cube)}
    }, {})
  }
  return reduce(pages, (a, p) => {
    let cubes = getCubes(p)
    let pp = {}
    pp[p._id] = p
    return {...a, ...pp, ...cubes}
  }, {})
}

export function Clipboard(cube, cubes = null){
  return { cube, cubes, timestamp: Date.now() }
}

export function getPageCubes(page, state){
  let blocks = getCubeBlocks(page, state.cubes)
  let cubes = {}
  for (let i in blocks){
    if (state.cubes[i])
      cubes[i] = cloneDeep(state.cubes[i])
  }
  return cubes

  // let cubes = {}
  // for (let i in page.blocks){
  //   if (state.cubes[i])
  //     cubes[i] = cloneDeep(state.cubes[i])
  // }
  // return cubes
}

// GET ALL BLOCKS FROM A CUBE
export function getCubeBlocks(cube, list){
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

export function History(page, state){
  let cubes = getPageCubes(page, state)
  return {
    index: 0,
    stack:[{ page: cloneDeep(page), activeId: page._id, cubes }],
    sid: page.sid,
  }
}

export function Page(uid, host){
  let path = NanoSlug()
  return {
    _id: ObjectId(),
    type: 'pg',
    name: 'Page',
    host: host,
    path: path,
    url: host + '/' + path,
    uid: uid,
    fonts: null,
    content: 'New Page ✨',
    sid: NanoId(),
    blocks: {},
    style: {
      color: null,
      display: null,
      width: null,
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      lineHeight: null,
      letterSpacing: null,
      textTransform: null,
      textAlign: 'center',
    },
    cubes: []
  }
}

export function Block(cube, uid){
  return {
    _id: ObjectId(),
    type: 'bk',
    name: 'Block',
    content: cube.content + ' Block 📦',
    src: cube._id,
    uid: uid,
    style: {
      color: null,
      display: 'block',
      width: null,
      height: null,
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      lineHeight: null,
      letterSpacing: null,
      textTransform: null,
      textAlign: 'center',
      padding: null,
      margin: null,
      border: null,
      borderRadius: null,
    },
    cubes: []
  }
}
