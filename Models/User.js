//@@ import dependencies
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from './../secret.js'
//@@ create schema
const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true,'name is required'],
    trim : true
  },
  email : {
    type : String,
    required : [true,'email is required'],
    validate : [validator.isEmail, 'email is not valid'],
    trim : true
  },
  password : {
    type : String,
    required : [true,'password is required'],
    trim : true,
    minlength : [8,'must be 8 character']
  }
},
{
  timestamps : true
})

//@@ hash password
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password,salt)
  this.password = hash
})
//@@ compare password
userSchema.method('matchPassword',async function (userPass) {
  return await bcrypt.compare(userPass,this.password)
})

//@@ create jwt
userSchema.method('generateToken', function() {
  return jwt.sign({id : this._id, 
  email : this.email},secretKey,{expiresIn : '1d'})
})

//@@ export model
const User = mongoose.model('User',userSchema)
export default User