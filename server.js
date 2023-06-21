//import dependencies
import app from './app.js'
import chalk from 'chalk'
import { serverPort } from './secret.js'

//listening the server
app.listen(serverPort,() => {
  console.log(chalk.bgBlue.black(
    `Server is running on : ${serverPort}`
  ))
})