import express, { type Application } from 'express'
import { initMiddlewares } from '../middlewares/essentials'

export const app: Application = express()
initMiddlewares(app)
