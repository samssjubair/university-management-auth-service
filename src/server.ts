import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import {logger,errorLogger} from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.databaseURL as string)
    logger.info('🛢 Connected to Database')
    app.listen(config.port, () => {
      logger.info('🚀 Server started on port ' + config.port)
    })
  } catch (error) {
    errorLogger.error('❌ Failed to connect to Database')
  }
}

bootstrap()
