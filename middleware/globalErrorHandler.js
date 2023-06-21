//@@ import dependencies
import {errFormatter } from '../utils/errorFormatter.js'

//@@ global error handler
const globalErrorHandler = (err,req,res,next) => {
  const defaultErrors = {
    statusCode : err.statusCode || 500,
    message : err.message
  }
  //validation errors
  if(err.name === 'ValidationError') {
    defaultErrors.statusCode = 400,
    defaultErrors.message = errFormatter(err.message)
  }
  //token error
  if(err.name === 'JsonWebTokenError') {
    defaultErrors.statusCode = 400,
    defaultErrors.message = 'invalid access token'
  }
  //token expired
  if(err.name === 'TokenExpiredError') {
    defaultErrors.statusCode = 400,
    defaultErrors.message = err.message
  }
  //duplicate error
  if(err.code && err.code === 11000) {
    defaultErrors.statusCode = 400,
    defaultErrors.message = `${Object.keys(err.keyValue)} has to be unique`
  }
  //send response
  res.status(defaultErrors.statusCode).json({
    status : 'fail',
    debagInfo : defaultErrors.message,
  })
}

export default globalErrorHandler