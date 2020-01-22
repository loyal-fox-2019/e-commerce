import axios from 'axios'

const axiosServer = axios.create({
  baseURL: 'http://localhost:80'
})

export default axiosServer
