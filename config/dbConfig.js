//@@ import dependencies
import mongoose from 'mongoose'
import {dbUri} from '../secret.js'
import chalk from 'chalk'
//@@ connect mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri,{dbName : 'todo_app'})
    console.log(chalk.bgCyan.black(
      `Connected with mongoDB : ${mongoose.connection.host}`
    ))
  } catch (error) {
    console.error(error)
  }
}

export default connectDB