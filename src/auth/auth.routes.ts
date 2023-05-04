import { Router } from 'express'
import { loginUsuarioHttp, atualizarSenhaUsuarioHttp, perfiUsuario } from './auth.controller'
import { authUser } from '../middlewares/auth'

export const rotasAuth = Router()

rotasAuth.post('/login', loginUsuarioHttp)
rotasAuth.get('/perfil', authUser, perfiUsuario)
rotasAuth.post('/update-password', authUser, atualizarSenhaUsuarioHttp)
