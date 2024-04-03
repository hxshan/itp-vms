const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const login = async (req,res)=>{

    try{
        const {email,password}=req.body
        if(!email||!password) return res.status(400).json({message:'All felds must be filled'})
        const user =await User.findOne({email}).populate('role').exec()

        if(!user) return res.status(401).json({message:'No such User'})
        if(user.status=='inactive') return res.status(401).json({message:`Account is ${user.status}`})

        const match = await bcrypt.compare(password,user.password)

        if(!match) return res.status(401).json({message:'Unauthorized'})
        const accessToken = jwt.sign(
            {
                UserInfo:{
                    "name":user.firstName,
                    "email":user.email,
                    "role":user.role
                }
            },
            process.env.SECRET,
            {expiresIn:'1d'}
        )

        const refreshToken = jwt.sign(
            {"email":user.email},
            process.env.REFRESH_SECRET,
            {expiresIn:'10d'}
        )
        const permissions = user.role
        return res.status(200).json({accessToken,refreshToken,permissions,email})
    }catch(error){
        return res.status(401).json({message:'Unauthorized'})
    }
}

const refresh = (req,res) =>{
    const cookie = req.cookies;
    console.log(cookie)
    if(!cookie.jwt) return res.status(401).json({message:'Unauthorized'})

    const refreshToken = cookie.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        async(err,decoded)=>{
            if(err) return res.status(403).json({message:'Forbidden'})
            const user = await User.findOne({'email':decoded.email}).exec()
            if(!user) res.status(401).json({message:'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    UserInfo:{
                        "name":user.firstName,
                        "email":user.email,
                        "role":user.role
                    }
                },
                process.env.SECRET,
                {expiresIn:'10s'}
            )

            res.json({accessToken})

        }

    ) 

}

const logout = (req,res) =>{
    const cookie = req.cookies
    if(!cookie.jwt) return res.sendStatus(204)
    res.clearCookie('jwt',{httpOnly:true,sameSite:None,secure:true})
    res.json({message:'cookie cleared'})

}






 









module.exports = { login, refresh,logout};
