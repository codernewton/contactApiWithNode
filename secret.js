//@@ import dependencies
import { config } from 'dotenv'; config()

//@@ define env variables
export const serverPort = process.env.PORT || 4000
export const dbUri = process.env.DB_URI_LOCAL
export const secretKey = process.env.JWT_SECRET