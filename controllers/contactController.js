//@@ import dependencies
import catchAsync from 'express-async-handler'
import appError from 'http-errors'
import Contact from '../Models/Contact.js'
import {isValidObjectId} from 'mongoose'

//@Disc : Create new contact || POST : /api/v1/contact || access : private
export const createContact = catchAsync(async (req,res,next) => {
  const {name,email,phone} = req.body
  if(!name || !email || !phone) {
    next(appError[400]('missing required info'))
  } else {
    const contact = await Contact.create({
      ...req.body,
      user : req.user.id
    })
    res.status(201).json({
      status : 'success',
      contact
    })
  }
})

//@Disc : Get all contact || GET : /api/v1/contact || access : private
export const getAllContact = catchAsync(async (req,res,next) => {
  const contacts = await Contact.find({user : req.user.id}).select({
    createdAt : 0, updatedAt : 0, __v : 0
  }).populate('user', 'name email -_id')
  if(contacts) {
    res.status(200).json({
      status :'success',
      contacts
    })
  }
})

//@Disc : Get contact by id || GET : /api/v1/contact/:id || access private
export const getContactById = catchAsync(async (req,res,next) => {
  const isValidId = isValidObjectId(req.params.id)
  if(!isValidId) {
    next(appError[400]('Invalid ID provided'))
  } else {
    const contact = await Contact.findOne({_id : req.params.id,user : req.user.id}).select({
      createdAt : 0, updatedAt : 0, __v : 0
    }).populate('user','name email -_id')
    if(contact) {
      res.status(200).json({
        status : 'success',
        contact
      })
    }else {
      next(appError.NotFound('no contact found'))
    }
  }
})

//@Disc : update contact by id || PUT : /api/v1/contact/:id || access : private
export const updateById = catchAsync(async (req,res,next) => {
  const isValidId = isValidObjectId(req.params.id)
  if(isValidId) {
    const contact = await Contact.findOne({_id : req.params.id,user :req.user.id})
    if(contact) {
      const {name,email,phone} = req.body
      if(name ||email || phone ) {
        const updatedContact = await Contact.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new : true, runValidators: true}
        )
        updatedContact.save()
        res.status(201).json({
          status : 'success',
          updatedContact
        })
      } else {
        next(appError[400]('provide necessary info for updating'))
      }
    } else {
      next(appError.NotFound('no contact found'))
    }
  } else {
    next(appError[400]('Invalid ID provided'))
  }
})

//@Disc : delete contact by id || DElETE : api/v1/contact/:id || access : private
export const deleteById = catchAsync(async (req,res,next) => {
  const isValidId = isValidObjectId(req.params.id)
  if(!isValidId) {
    next(appError[400]('Invalid ID provided'))
  } else {
    const contact = await Contact.findOne({_id : req.params.id, user : req.user.id})
    if(contact) {
      const deletedItem = await Contact.findByIdAndRemove(req.params.id)
      res.status(200).json({
        status : 'success',
        message : `${deletedItem._id} was deleted successfully`
      })
    }else {
      next(appError.NotFound('no contact found'))
    }
  }
})