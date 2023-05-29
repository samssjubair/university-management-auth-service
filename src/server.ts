import mongoose from 'mongoose'
import app from './app'
import config from './config/config'

async function bootstrap() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log('🛢 Connected to Database')
    app.listen(config.port, () => {
      console.log('🚀 Server started on port ' + config.port)
    })
  } catch (error) {
    console.log('❌ Failed to connect to Database')
  }
}

bootstrap()
