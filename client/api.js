import axios from 'axios'

const port = process.env.PORT || 3000;

export function getGroups (){
  return axios.get(`http://localhost:${port}/api/groups`).then(response => { return response.data })
}

export function getLikes (){
  return axios.get(`http://localhost:${port}/api/likes`).then(response => { return response.data })
}
