const mongoose = require('mongoose')
require('dotenv').config()
//NANTI SEBELUM DPLOY DIGANTI SAMA YANG ATLAS
// console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI , {
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