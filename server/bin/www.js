#!/usr/bin/env node

// const http = require('http')
const app = require('../app')
const port = process.env.PORT || 3000

// app.set('port', port)

// const server = http.createServer(app)

// server.listen(port, () => console.log(`Express server is listening on port ${port}`))

app.listen(port, () => `Express server is listening on port ${port}`)