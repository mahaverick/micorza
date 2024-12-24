import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import timeout from 'connect-timeout'

import corsOptions from '@/configs/cors/cors-options'
import { errorHandler } from '@/middlewares/error.middleware'
import routes from '@/routes/index.routes'
import { logger } from '@/utils/logger.utils'

config()

const app = express()

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use(limiter)
app.use(compression()) // Add compression
app.use(timeout('30s')) // Add timeout
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(helmet())
app.use(cookieParser())

app.use(json())
app.use(urlencoded({ extended: false }))

// Use the centralized routes
app.use('/api', routes)

// Use the error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port http://localhost:${PORT}`)
})

// Graceful shutdown handling
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

function gracefulShutdown() {
  logger.info('Received shutdown signal. Starting graceful shutdown...')
  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown:', err)
      process.exit(1)
    }
    logger.info('Server closed successfully')
    process.exit(0)
  })

  // Force shutdown after 30 seconds if graceful shutdown fails
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 30000)
}
