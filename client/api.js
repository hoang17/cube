import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`
import _  from 'lodash'

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

const page = {
  _id: undefined,
  name: 'Page',
  type: 'pg',
  url: '/',
  userId: undefined,
  content: 'New Page 🙌🏻',
  active: false,
  style: {
    color: '',
    display: 'block',
    width: '',
    fontFamily: 'Roboto',
    fontSize: '1em',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0rem',
    textTransform: 'none',
    textAlign: 'center',
    flex: undefined,
    flexFlow: undefined
  },
  cubes: [],
}

export function initNewPage(){
  return _.cloneDeep(page)
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
    return _.fromPairs(_.map(res.data, i => [i._id, i]))
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
