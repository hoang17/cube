import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`
import fromPairs from 'lodash/fromPairs'
import map from 'lodash/map'

const createAPI = (token) => {
  return axios.create({
    baseURL: `${host}/api/`,
    headers: {'x-token': token},
    withCredentials: false,
    timeout: 1000,
  })
}

export function setup(token){
  let api = createAPI(token)
  return {
    async get(endpoint, params){
      let res = await api.get(endpoint, { params })
      return res.data
    },
    async patch(endpoint, params){
      let res = await api.patch(endpoint, params)
      return res.data
    },
    async addCube(cube){
      try {
        let res = await api.post('cubes', cube)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async updateCube(cube){
      try {
        let res = await api.put('cubes', cube)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async deleteCube(id){
      try {
        let res = await api.delete(`cubes/${id}`)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async fetchCubes(){
      try {
        let res = await api.get('cubes')
        return fromPairs(map(res.data, i => [i._id, i]))
      } catch (e) {
        console.error(e)
      }
    },
    async fetchPages(){
      try {
        let res = await api.get('pages')
        return fromPairs(map(res.data, i => [i._id, i]))
      } catch (e) {
        console.error(e)
      }
    },
    async fetchPage(id){
      try {
        let res = await api.get(`pages/${id}`)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async addPage(page){
      try {
        let res = await api.post('pages', page)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async updatePage(page){
      try {
        let res = await api.put('pages', page)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async deletePage(id){
      try {
        let res = await api.delete(`pages/${id}`)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async fetchRoute(url){
      try {
        let res = await api.post('routes', { url })
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async addStyle(style){
      try {
        let res = await api.post('styles', style)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async updateStyle(style){
      try {
        let res = await api.put('styles', style)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async deleteStyle(id){
      try {
        let res = await api.delete(`styles/${id}`)
        return res.data
      } catch (e) {
        console.error(e)
      }
    },
    async fetchStyles(){
      try {
        let res = await api.get('styles')
        return fromPairs(map(res.data, i => [i._id, i]))
        return res.data
      } catch (e) {
        console.error(e)
      }
    }
  }
}
