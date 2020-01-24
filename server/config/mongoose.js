const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/ecommerce_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log('cannot connect to database')
})