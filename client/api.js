import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`

const api = axios.create({
  baseURL: `${host}/api/`,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export async function get(endpoint, params){
  let response = await api.get(endpoint, { params })
  return response.data
}

const token = "EAACTwZBgD6mUBAHgChYLWy78DcnWEOYy9gl55E0sEi87pJIRz7R4fcY0nocZBO1grPeDrJo32NK5n529g3m0jHbcAdlZA7RyRwnTr3TP1JDbnXt3ZBtzWNNt4MeoV1sMnxWPGs8zqbf1FStll5U5sZCKjhbhruMQ2q52jk0rjogZDZD"

const fb = axios.create({
  baseURL: 'https://graph.facebook.com/',
  params: { access_token: token }
})

export async function fetchData(id, ver, params) {
  try {
    let url = `${ver}/${id}/feed`
    let res = await fb.get(url, { params: params })
    return res.data.data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchItems(id, skip, limit, ver){
  return fetchData(id, ver, { fields: 'id,message,picture,full_picture,place,type,from{name, picture},story,link,name,description,attachments,comments.summary(true){message,from{name,picture},comments{message,from{name,picture},attachment},comment_count,like_count,created_time,attachment},created_time,updated_time', offset: skip, limit: limit })
}
