//@@ import dependencies
import mongoose from 'mongoose'
import validator from 'validator'

//@@ create schema
const contactSchema = new mongoose.Schema({
  name : {
    type : String,
    trim : true,
    required : [true, 'name is required']
  },
  email : {
    type : String,
    validate : [validator.isEmail,'invalid email'],
    required : [true, 'email is required'],
    unique : [true,'email must unique'],
    lowercase : true
  },
  phone : {
    type : String,
    validate : {
      validator : function(v) {
        return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(v)
      },
      message : 'invalid phone'
    },
    required : [true, 'phone is required'],
    unique : [true,'phone must unique']
  },
  country : {
    type : String,
    default : 'Bangladesh'
  },
  user : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  }
},
{
  timestamps : true
})

//export model
const Contact = mongoose.model('Contact',contactSchema)
export default Contact