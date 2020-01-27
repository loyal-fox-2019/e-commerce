import axios from 'axios'

export default axios.create({
    baseURL: 'http://3.0.182.128:3001/',
    headers: {
        token: localStorage.getItem('token')
    }
})