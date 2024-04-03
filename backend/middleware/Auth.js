const jwt =require('jsonwebtoken')
const User = require('../models/userModel')


const Auth = async (req, res, next) =>{
    const { authorization } = req.headers
    console.log(authorization)
    if(!authorization){
        return res.status(401).json({error:'Auth token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        
        const {email} = jwt.verify(token,process.env.SECRET)
        req.user = await User.findOne({email}).select('email')
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({error:'request not authorized '+token})
    }

}

module.exports = Auth