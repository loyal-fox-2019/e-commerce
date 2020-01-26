const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://52.221.236.249:4000',
});

module.exports = instance