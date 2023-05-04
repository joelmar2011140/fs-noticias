import { Router } from 'express'
import { rotasUser } from '../users/users.routes'
import { rotasAuth } from '../auth/auth.routes'

export const apiRoutes = Router()

apiRoutes.use('/usuarios', rotasUser)
apiRoutes.use('/auth', rotasAuth)
