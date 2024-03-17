const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const login = async (req,res)=>{
    const {email,password}=req.body

    if(!email||!password) res.status(400).json({message:'All felds must be filled'})

    const user =await User.findOne({email}).exec()

    if(!user || user.status=='inactive') res.status(401).json({message:'Unauthorized'})


    const match = await bcrypt.compare(password,user.password)

    if(!match) res.status(401).json({message:'Unauthorized'})


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

    const refreshToken = jwt.sign(
        {"email":user.email},
        process.env.REFRESH_SECRET,
        {expiresIn:'1d'}
    )

    res.cookie('jwt',refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge:7*24*60*60*1000 //7days
    })

    res.json({accessToken})
}

const refresh = (req,res) =>{
    const cookies = req.cookies

    if(!cookie.jwt) return res.status(401).json({message:'Unauthorized'})

    const refreshToken = cookies.jwt

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
    const cookies = req.cookies
    if(!cookies.jwt) return res.sendStatus(204)
    res.clearCookie('jwt',{httpOnly:true,sameSite:None,secure:true})
    res.json({message:'cookie cleared'})

}






 









module.exports = { login, refresh,logout};
