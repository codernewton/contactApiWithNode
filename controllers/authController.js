//@@ import dependencies
import catchAsync from 'express-async-handler'
import appError from 'http-errors'
import User from '../Models/User.js'

//@Disc : register new user || POST : api/v1/user/register || access : public
export const registerUser = catchAsync(async (req,res,next) => {
  const {email} = req.body
  if(await User.findOne({email})) {
    next(appError.BadRequest('email already exist'))
  } else {
    const user = await User.create(req.body)
    delete user._doc.password
    res.status(201).json({
      status : 'success',
      user
    })
  }
})

//@Disc : login user || POST : api/v1/user/login || access : public
export const loginUser = catchAsync(async (req,res,next) => {
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!email || !password) next(appError[400]('missing credentials'))
  if(user && await user.matchPassword(password)) {
    const token = user.generateToken()
    delete user._doc.password
    res.status(200).json({
      status : 'login success',
      token
    })
  } else {
    next(appError[400]('invalid email or password'))
  }
})