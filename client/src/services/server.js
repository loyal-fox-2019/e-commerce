import axios from 'axios'

const developmentURL = `http://localhost:3000`
const productionURL = `http://18.219.119.178:55555`

const axiosInstance = axios.create({
   baseURL: developmentURL,
   headers: {
      token: localStorage.token
   }
})

axiosInstance.interceptors.request.use(function(config) {
   config.headers.token = localStorage.token
   return config
})

export default axiosInstance