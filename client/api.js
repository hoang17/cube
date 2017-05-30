import axios from 'axios'

const port = process.env.PORT || 3000;

const host = process.env.VUE_ENV === 'server' ? `http://localhost:${port}` : window.location.origin

export function fetch(endpoint){
  return axios.get(`${host}/api/${endpoint}`).then(response => { return response.data })
}
