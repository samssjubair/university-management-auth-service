/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error('❌ Uncaught Exception')
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseURL as string)
    logger.info('🛢 Connected to Database')
    server = app.listen(config.port, () => {
      logger.info('🚀 Server started on port ' + config.port)
    })
  } catch (error) {
    errorLogger.error('❌ Failed to connect to Database')
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled Rejection detected, we are closing our server...')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })

  // process.on('unhandledRejection', (error) => {
  //   errorLogger.error('❌ Unhandled Rejection')
  //   process.exit(1)
  // })
}

bootstrap()

//Sigterm signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server')
  if (server) {
    server.close()
  }
})
