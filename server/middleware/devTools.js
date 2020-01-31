module.exports = function(xModel, command){
    return (req,res,next) =>{
        const queryModel = require(`../model/${xModel}`)
        
        const queryString = `
        queryModel.${command}()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            next(err)
        })
        `

        eval(queryString)
    }
}