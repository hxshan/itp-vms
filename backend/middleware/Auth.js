const jwt =require('jsonwebtoken')
const User = require('../models/userModel')


const Auth = async (req, res, next) =>{

    //console.log(req.headers)
    const { authorization } = req.method == 'GET'||req.method == 'DELETE'?req.headers:req.body.headers//put patch post req
    if(!authorization){
        return res.status(401).json({error:'Auth token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        
        const decoded = jwt.verify(token,process.env.SECRET)
        const email=decoded?.UserInfo?.email
        req.user = await User.findOne({email}).populate('role').select('email')
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({error:'request not authorized '})
    }

}

module.exports = Auth