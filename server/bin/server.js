const server = require('http').createServer(require('../app'))
const port = process.env.PORT

server.listen(port, ()=>{
    console.log('server listening on port', port);
})

const io = require('socket.io')(server)
io.on('connection', function (socket) {
    console.log(' \n======================\n TRIGGER CONNECGTION')
    socket.emit('news', { hello: 'world' });

    socket.on('my other event', function (data) {
      console.log(data);
    });

    socket.on('updatingInvoice', function(data){
        console.log(' \n======================\n TRIGGER BY CLIENT UPDATING INVOICE')
        socket.broadcast.emit('reFetchInvoice')
    })
});

