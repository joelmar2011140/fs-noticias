import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import hpp from 'hpp'
import morgan from 'morgan'
import { json, urlencoded, type Application } from 'express'
import { errorMiddleware, notFoundError } from './errors'
import { apiRoutes } from '../app/app.routes'

export function initMiddlewares (app: Application): void {
  const mode = process.env.NODE_ENV === 'DEV' ? 'dev' : 'combined'
  app.use(helmet())
  app.use(cors({
    allowedHeaders: '*',
    credentials: true,
    origin: '*'
  }))
  app.use(hpp())
  app.use(compression())
  app.use(json({ limit: '1mb' }))
  app.use(urlencoded({ limit: '1mb', extended: false }))
  app.use(morgan(mode))
  app.use('/api', apiRoutes)
  app.use(notFoundError)
  app.use(errorMiddleware)
}
