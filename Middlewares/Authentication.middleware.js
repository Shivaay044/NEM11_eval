const jwt = require('jsonwebtoken');


const Authentication = (req,res,next) =>{
    const token  = req?.headers?.authorization?.split(" ")[1]
    const decoded = jwt.verify(token, 'post');
    console.log(Object.keys(req.query).length)
    if(decoded ){
        req.body.userID = decoded.userID
        next()
    }else{
        res.status(400).send({"msg":"token not available"})
    }
}





module.exports = Authentication