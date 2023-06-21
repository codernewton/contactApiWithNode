//@@ import dependencies
import {Router} from 'express'
import { loginUser,registerUser } from '../controllers/authController.js'

//@@ initialize express routes
const authRouter = Router()

//@@@ define routes

//@@ register new user
authRouter.post('/register',registerUser)

//@@ login new user
authRouter.post('/login',loginUser)

//@@ export the router
export default authRouter