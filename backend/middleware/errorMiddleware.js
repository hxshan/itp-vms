//Unsupported (404) routes

const notFound = (req,res,next) => {
    const error = new Error (`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


//Middleware to handle Error
const errorHandler = (error,req,res,next) => {
    if(res.headerSent){
        return next(error)
    }

    const statusCode = Number.isInteger(error.code) ? error.code : 500
    console.error('Error handling request', {
        route: req.originalUrl,
        method: req.method,
        error: {
            name: error.name,
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
        }
    })

    const publicMessage = statusCode >= 500 ? 'Internal server error' : (error.publicMessage || 'Request failed')
    res.status(statusCode).json({message: publicMessage})
}

module.exports = {notFound, errorHandler}