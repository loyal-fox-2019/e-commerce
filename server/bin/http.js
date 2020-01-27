'use strict'
const app = require('../app')
const port = process.env.PORT || 3000

require('http').createServer(app).listen(port);

console.log(`Server listening on port ${port}`);