import axios from 'axios'
const port = process.env.PORT || 3000;
const host = process.env.VUE_ENV === 'server' ? `http://localhost:${port}` : window.location.origin

const api = axios.create({
  baseURL: `${host}/api/`,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export function fetch(endpoint){
  return api.get(endpoint).then(response => { return response.data })
}

const token = "EAACTwZBgD6mUBAHgChYLWy78DcnWEOYy9gl55E0sEi87pJIRz7R4fcY0nocZBO1grPeDrJo32NK5n529g3m0jHbcAdlZA7RyRwnTr3TP1JDbnXt3ZBtzWNNt4MeoV1sMnxWPGs8zqbf1FStll5U5sZCKjhbhruMQ2q52jk0rjogZDZD"

const fb = axios.create({
  baseURL: 'https://graph.facebook.com/v2.3/',
  params: { access_token: token }
})

const fetchData = async function(url, params) {
  try {
    let res = await fb.get(url, {params: params})
    return res.data.data
  } catch (e) {
    console.log(e)
  }
}

export function fetchItems(id, offset, limit){
  return fetchData(`${id}/feed`, { fields: 'id,message,picture,full_picture,place,type,from{name, picture},story,link,name,description,attachments,created_time', offset: offset, limit: limit })
}

export function fetchUrl(url){
  return fetchData(url)
}
