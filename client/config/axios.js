const axios = require('axios')
console.log(' \n======================\n', process.env.NODE_ENV)

let instance
if(process.env.NODE_ENV === 'development')
{
    instance = axios.create({
        baseURL: 'http://localhost:3000'
    })
}
else if(process.env.NODE_ENV === 'production')
{
    instance = axios.create({
        baseURL: 'http://ecommerce-server.japhendywijaya.xyz:3000'
    })
}

export default instance