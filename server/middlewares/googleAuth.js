const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function googleAuth(req,res,next) {
    let id_token = req.params.id_token

    if(!id_token){
        res.status(401).json({
            message: 'Authentication fail'
        })
    }

    async function verify(){
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        req.user = payload
    }

    verify()
    .then(success=>{
        next()
    })
    .catch(err=>{
        res.status(401).json({
            message: 'Authentication fail'
        })
    })
}

module.exports = googleAuth