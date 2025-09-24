const allowedOrigins = require('./allowedOrigins')

const corsOptions={
    origin:(origin,callback)=>{
        if(!origin){
            return process.env.NODE_ENV !== 'production'
                ? callback(null,true)
                : callback(new Error('CORS: origin required'))
        }
        if(allowedOrigins.includes(origin)){
            return callback(null,true)
        }
        return callback(new Error('CORS: not allowed'))
    },
    credentials:true,
    methods:['GET','HEAD','PUT','PATCH','POST','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
    optionsSuccessStatus:204
}

module.exports=corsOptions