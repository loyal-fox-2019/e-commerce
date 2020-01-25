import axios from 'axios'

const axiosServer = axios.create({
  baseURL: 'https://serverwarteg.amilhasbala.com'
  // baseURL: 'http://localhost:80'
})

export default axiosServer
