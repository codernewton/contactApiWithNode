//@@ import dependencies
import express from 'express'
import helmet from 'helmet'
import limitRequest from 'express-rate-limit'
import appError from 'http-errors'
import morgan from 'morgan'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler.js'
import authRouter from './routers/authRouter.js'
import contactRouter from './routers/contactRouter.js'
//@@ database connection
import connectDB from './config/dbConfig.js'; connectDB()

//@@ initialize express app
const app = express()

//@@ define middleware
app.use(express.json({limit : '100kb'}))
app.use(express.urlencoded({extended : true, limit : '100kb'}))
app.use(helmet())
app.use(limitRequest({
  windowMs : 1 * 60 * 1000,
  limit : 100,
  standardHeaders : false,
  legacyHeaders : false
})),
app.use(cors())
app.use(morgan('dev'))

//@@ define routes
app.use('/api/v1/user',authRouter)
app.use('/api/v1',contactRouter)

//@@ control unhandled routes
app.all('*',(req,res,next) => {
  next(appError.NotFound(`${req.originalUrl} - not found in this server`))
})

//@@ global error handler
app.use(globalErrorHandler)

//@@ export the app
export default app