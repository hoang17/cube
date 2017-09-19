import generate from 'nanoid/generate'
import cloneDeep  from 'lodash/cloneDeep'
import reduce  from 'lodash/reduce'

export const NanoId = (length = 10) => generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length)

export const NanoSlug = (length = 6) => generate('0123456789abcdefABCDEF', length)

export const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export function clone(cube){
  const id = (c) => {
    c._id = ObjectId()
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

export function Clipboard(cube, styles = null, cubes = null){
  return { cube, styles, cubes, timestamp: Date.now() }
}

export function History(page, allCubes){
  let cubes = {}
  for (let i in page.blocks){
    cubes[i] = cloneDeep(allCubes[i])
  }
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
    content: 'New Page ✨',
    css: null,
    sid: NanoId(),
    blocks: {},
    styles: {},
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
      // flex: null,
      // flexFlow: null
    },
    cubes: []
  }
}

export function Style(name){
  return {
    _id: ObjectId(),
    name: name,
    style: {
      color: null,
      display: null,
      width: null,
      height: null,
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      lineHeight: null,
      letterSpacing: null,
      textTransform: null,
      textAlign: null,
      padding: null,
      margin: null,
      border: null,
      borderRadius: null,
      minWidth: null,
      minHeight: null,
      maxWidth: null,
      maxHeight: null,
    },
  }
}

export function Block(cube){
  return {
    _id: ObjectId(),
    type: 'block',
    name: 'Block',
    content: [cube.content,'Block 📦'].join(' '),
    src: cube._id,
    css: null,
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
