import { Router } from 'express'
import { loginUsuarioHttp, atualizarSenhaUsuarioHttp, perfiUsuario, generateKeyHttp, grantAcessHttp } from './auth.controller'
import { authAPI, authUser } from '../middlewares/auth'

export const rotasAuth = Router()

rotasAuth.post('/login', loginUsuarioHttp)
rotasAuth.get('/perfil', authUser, perfiUsuario)
rotasAuth.post('/update-password', authUser, atualizarSenhaUsuarioHttp)
rotasAuth.post('/generateKey', generateKeyHttp)
rotasAuth.post('/grant-access', authAPI, grantAcessHttp)
