import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`
import { fromPairs, map } from 'lodash'

const api = axios.create({
  baseURL: `${host}/api/`,
  // withCredentials: true,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export async function get(endpoint, params){
  let res = await api.get(endpoint, { params })
  return res.data
}

export async function patch(endpoint, params){
  let res = await api.patch(endpoint, params)
  return res.data
}

export const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export function newPage(host){
  let id = ObjectId()
  let path = id
  return {
    _id: id,
    name: 'Page',
    type: 'pg',
    host: host,
    path: path,
    url: host + '/' + path,
    userId: undefined,
    content: 'New Page 🙌🏻',
    new: true,
    css: null,
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
      // flex: undefined,
      // flexFlow: undefined
    },
    cubes: [],
  }
}

// export async function saveCube(cube){
//   try {
//     let res = await api.post('cubes', cube)
//     return res.data
//   } catch (e) {
//     console.error(e)
//   }
// }
//
// export async function removeCube(id){
//   try {
//     let res = await api.delete(`cubes/${id}`)
//     return res.data
//   } catch (e) {
//     console.error(e)
//   }
// }

export async function fetchPages(){
  try {
    let res = await api.get('pages')
    return fromPairs(map(res.data, i => [i._id, i]))
    // return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchPage(id){
  try {
    let res = await api.get(`pages/${id}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function savePage(page){
  try {
    let res = await api.post('pages', page)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function deletePage(id){
  try {
    let res = await api.delete(`pages/${id}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchRoute(url){
  try {
    let res = await api.post('routes', { url })
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function saveStyle(style){
  try {
    let res = await api.post('styles', style)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchStyles(){
  try {
    let res = await api.get('styles')
    // return fromPairs(map(res.data, i => [i._id, i]))
    return res.data
  } catch (e) {
    console.error(e)
  }
}
