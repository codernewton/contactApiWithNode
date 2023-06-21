import jwt from 'jsonwebtoken'
import catchAsync from 'express-async-handler'
import appError from 'http-errors'
import { secretKey } from '../secret.js'
import User from '../Models/User.js'

export const userAuth = catchAsync(async (req,res,next) => {
  const authHeader = req.headers['Authorization','authorization']
  if(authHeader) {
    const token = authHeader.split(' ')[1]
    if(token) {
      const decodedPayloads = jwt.verify(token,secretKey)
      req.user = decodedPayloads
      const user = await User.findById(decodedPayloads.id)
      if(user) {
        next()
      } else {
        next(appError[401]('Unauthorized user'))
      }
    } else {
      next(appError[401]('Unauthorized user'))
    }
  } else {
    next(appError[401]('Unauthorized user'))
  }
})
