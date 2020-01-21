const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/ecommerce_'+process.env.NODE_ENV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log('cannot connect to database')
})