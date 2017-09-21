import generate from 'nanoid/generate'
import cloneDeep  from 'lodash/cloneDeep'
import reduce  from 'lodash/reduce'
import Vue from 'vue'

export const bus = new Vue()

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

export function getPageCubes(page, state){
  let cubes = {}
  for (let i in page.blocks){
    if (state.cubes[i])
      cubes[i] = cloneDeep(state.cubes[i])
  }
  return cubes
}

export function getPageStyles(page, state){
  let styles = {}
  for (let i in page.styles){
    if (state.styles[i])
      styles[i] = cloneDeep(state.styles[i])
  }
  return styles
}

// GET ALL STYLES FROM A CUBE
export function getCubeStyles(cube, blocks){
  let styles = {}

  var getStyles = cubes => {
    if (!cubes) return
    for (let i in cubes){
      let c = cubes[i]
      let j = c.css
      if (j){
        styles[j] = styles[j] ? styles[j]+1 : 1
      }
      if (c.src){
        let s = blocks[c.src]
        let e = s.css
        if (e){
          styles[e] = styles[e] ? styles[e]+1 : 1
        }
        getStyles(s.cubes)
      }
      else getStyles(c.cubes)
    }
  }

  if (cube.css)
    styles[cube.css] = 1

  if (cube.src){
    let o = blocks[cube.src]
    let i = o.css
    if (i){
      styles[i] = styles[i] ? styles[i]+1 : 1
    }
    getStyles(o.cubes)
  }
  else getStyles(cube.cubes)

  return styles
}

// GET ALL BLOCKS FROM A CUBE
export function getCubeBlocks(cube){
  let blocks = {}
  var getBlocks = cubes => {
    if (!cubes) return
    for (let i in cubes){
      let c = cubes[i]
      if (c.src){
        if (blocks[c.src]) blocks[c.src]++
        else blocks[c.src] = 1
      }
      if (c.cubes && c.cubes.length > 0)
        getBlocks(c.cubes)
    }
  }
  if (cube.src)
    blocks[cube.src] = 1
  getBlocks(cube.cubes)
  return blocks
}

export function History(page, state){
  let cubes = getPageCubes(page, state)
  let styles = getPageStyles(page, state)
  return {
    index: 0,
    stack:[{ page: cloneDeep(page), activeId: page._id, cubes, styles }],
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
      display: null,
      minWidth: null,
      minHeight: null,
      maxWidth: null,
      maxHeight: null,
      border: null,
      borderRadius: null,
      transform: null,
      background: null,
      flex: null,
      flexFlow: null
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
