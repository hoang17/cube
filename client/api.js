import axios from 'axios'

export function getGroups (){
  return axios.get(`http://localhost:3000/api/groups`).then(response => { return response.data })
}
