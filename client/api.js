import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`

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

let fb = null

async function getApi(token){
  if (fb) return fb
  fb = axios.create({
    baseURL: 'https://graph.facebook.com/',
    params: { access_token: token }
  })
  return fb
}

export async function fetchData(token, id, ver, params) {
  try {
    fb = await getApi(token)
    let url = `${ver}/${id}/feed`
    let res = await fb.get(url, { params: params })
    return res.data.data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchItems(token, id, skip, limit, ver){
  return fetchData(token, id, ver, { fields: 'id,message,picture,full_picture,place,source,type,from{name, picture},story,link,name,description,attachments,comments.limit(0).summary(true),created_time,updated_time', offset: skip, limit: limit })
}

export async function fetchComment(token, id) {
  try {
    fb = await getApi(token)
    let url = `v2.3/${id}`
    let res = await fb.get(url, { params: {fields: 'comments.summary(true){message,from{name,picture},comments{message,from{name,picture},attachment,created_time},comment_count,like_count,created_time,attachment}'} })
    return res.data.comments
  } catch (e) {
    console.error(e)
  }
}

export async function fetch(token, url) {
  fb = await getApi(token)
  const res = await fb.get(url, { params: { limit: 500 }})
  res.data.data.map(v => {
    v.star = false
    if (v.privacy)
      v.ver = v.privacy == 'OPEN' || v.administrator ? 'v2.4' : 'v2.3'
  })
  return res.data
}

export async function postComment(token, id, message){
  fb = await getApi(token)
  let url = `v2.6/${id}/comments`
  let res = await fb.post(url, {message: message})
  return res.data
}
