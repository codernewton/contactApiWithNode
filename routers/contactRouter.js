//@@ import dependencies
import {Router} from 'express'
import { createContact, deleteById, getAllContact, getContactById, updateById } from '../controllers/contactController.js'
import { userAuth } from '../middleware/verifyToken.js'
//@@ create router
const contactRouter = Router()

//@@ define routes

//@get single contact by id
contactRouter.get('/contact/:id',userAuth,getContactById)
//@update contact by id
contactRouter.put('/contact/:id',userAuth,updateById)
//@delete contact by id
contactRouter.delete('/contact/:id',userAuth,deleteById)
//@create new contact
contactRouter.post('/contact',userAuth,createContact)
//@get all contact
contactRouter.get('/contact',userAuth,getAllContact)

export default contactRouter