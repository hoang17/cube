import axios from 'axios'

export function getGroups (){
  return axios.get(`http://localhost:${process.env.PORT}/api/groups`).then(response => { return response.data })
}
