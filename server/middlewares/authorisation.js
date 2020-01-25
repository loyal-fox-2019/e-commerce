const Article = require("../models/article");

function article_authorisation(req,res,next)
{    
    Article.findById(req.params.id)
    .then((article) => {
        if(article.author.toString() != req.userInfo.id)
        {
            next({status: 403, message: "Not authorised"});
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        next(err);
    });
}

function user_authorisation(req,res,next)
{    
    User.findById(req.params.id)
    .then((user) => {
        if(user._id.toString() != req.userInfo.id)
        {
            next({status: 403, message: "Not authorised"});
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = {
    article_authorisation,
    user_authorisation
};
