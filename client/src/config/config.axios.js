import axios from 'axios'

const base = axios.create({
  baseURL: 'http://35.239.197.248/'
})

export default base;