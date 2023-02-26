import * as dotenv from 'dotenv'
dotenv.config()
const { APP_PORT, MONGO_DB, MONGO_PORT, MONGO_HOST } = process.env
export { APP_PORT, MONGO_DB, MONGO_PORT, MONGO_HOST }
