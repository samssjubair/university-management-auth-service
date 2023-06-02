import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT || 5002,
  databaseURL: process.env.ATLAS_URL,
  default_user_password: process.env.STUDENT_USER_PASSWORD,
}
