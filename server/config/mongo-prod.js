const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_PROD, 
  { useNewUrlParser: true, 
    useUnifiedTopology:true, 
    useCreateIndex:true,
    useFindAndModify: false
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('PRODUCTION MONGOOSE CONNECTED');
  
});