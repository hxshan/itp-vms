const allowedOrigins = require('./allowedOrigins')

const corsOptions={
    origin:(origin,callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('not allowed by CORS'))
        }
    },
    credentials:true,
    optionSuccessStatus:200
}

module.exports=corsOptions