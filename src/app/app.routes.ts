import { Router } from 'express'
import { rotasUser } from '../users/users.routes'
import { rotasAuth } from '../auth/auth.routes'
import { rotasNoticias } from '../noticias/noticias.routes'

export const apiRoutes = Router()

apiRoutes.use('/usuarios', rotasUser)
apiRoutes.use('/auth', rotasAuth)
apiRoutes.use('/noticias', rotasNoticias)
