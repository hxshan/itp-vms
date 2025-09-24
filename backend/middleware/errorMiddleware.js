//Unsupported (404) routes

const notFound = (req,res,next) => {
    const error = new Error('Not found')
    error.statusCode = 404
    next(error)
}


//Middleware to handle Error
const errorHandler = (error,req,res,next) => {
    if(res.headersSent){
        return next(error)
    }

    const status = error.statusCode || error.code || 500
    const isProd = process.env.NODE_ENV === 'production'

    const errorId = Date.now().toString()
    console.error(`[${errorId}]`, error)

    const payload = { message: status === 404 ? 'Resource not found' : 'Internal server error', errorId }
    return res.status(status).json(isProd ? payload : payload)
}

module.exports = {notFound, errorHandler}