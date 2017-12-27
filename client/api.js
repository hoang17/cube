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
    timeout: 10000,
  })
}

export function key(array){
  return fromPairs(map(array, i => [i._id, i]))
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
      let res = await api.post('cubes', cube)
      return res.data
    },
    async updateCube(cube){
      let res = await api.put('cubes', cube)
      return res.data
    },
    async deleteCube(id){
      let res = await api.delete(`cubes/${id}`)
      return res.data
    },
    async fetchCubes(){
      let res = await api.get('cubes')
      return key(res.data)
    },
    async fetchPages(appId){
      let res = await api.get('pages/?appId='+appId)
      return key(res.data)
    },
    async fetchPage(id){
      let res = await api.get(`pages/${id}`)
      return res.data
    },
    async addPage(page){
      let res = await api.post('pages', page)
      return res.data
    },
    async updatePage(page){
      let res = await api.put('pages', page)
      return res.data
    },
    async deletePage(id){
      let res = await api.delete(`pages/${id}`)
      return res.data
    },
    async fetchRoute(url){
      let res = await api.post('routes', { url })
      return res.data
    },
    async fetchViewData(url){
      let res = await api.post('view', {url: url})
      let page = res.data.page
      if (!page) return { page }
      let cubes = key(res.data.cubes)
      return { page, cubes }
    },
    async stripeSubscribe(data){
      let res = await api.post('stripeSubscribe', data)
      return res.data
    },
  }
}
