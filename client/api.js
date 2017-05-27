import axios from 'axios'

const port = process.env.PORT || 3000;

const host = process.env.VUE_ENV === 'server' ? `http://localhost:${port}` : window.location.origin

export function getGroups (){
  return axios.get(`${host}/api/groups`).then(response => { return response.data })
}

export function getLikes (){
  return axios.get(`${host}/api/likes`).then(response => { return response.data })
}
