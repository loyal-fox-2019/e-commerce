const bcrypt = require('bcrypt');
const saltRounds = 8

function hasher(password){
    console.log('masuk hasher')
    console.log("password asli : "+password)
    let hashed = bcrypt.hashSync(password,saltRounds)
    console.log('hashed password : '+hashed)
    return hashed
}

function comparer(password, hashed){
    console.log('masuk comparer')
    console.log("password asli : "+password)
    console.log('hashed password : '+hashed)
    let compareResult = bcrypt.compareSync(password,hashed)
    console.log('compare result : '+compareResult)
    return compareResult
}

module.exports = {
    hasher,
    comparer
};
