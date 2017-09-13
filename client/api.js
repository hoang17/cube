import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`
import fromPairs from 'lodash/fromPairs'
import map from 'lodash/map'

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
// export async function fetchCubes(){
//   try {
//     let res = await api.get('cubes')
//     return fromPairs(map(res.data, i => [i._id, i]))
//   } catch (e) {
//     console.error(e)
//   }
// }

export async function fetchPages(){
  try {
    let res = await api.get('pages')
    return fromPairs(map(res.data, i => [i._id, i]))
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

export async function addPage(page){
  try {
    let res = await api.post('pages', page)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function updatePage(page){
  try {
    let res = await api.put('pages', page)
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

export async function addStyle(style){
  try {
    let res = await api.post('styles', style)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function updateStyle(style){
  try {
    let res = await api.put('styles', style)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function deleteStyle(id){
  try {
    let res = await api.delete(`styles/${id}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchStyles(){
  try {
    let res = await api.get('styles')
    return fromPairs(map(res.data, i => [i._id, i]))
    return res.data
  } catch (e) {
    console.error(e)
  }
}
