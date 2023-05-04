import { Router } from 'express'
import { loginUsuarioHttp, atualizarSenhaUsuarioHttp, perfiUsuario } from './auth.controller'

export const rotasAuth = Router()

rotasAuth.post('/login', loginUsuarioHttp)
rotasAuth.get('/perfil', perfiUsuario)
rotasAuth.post('/update-password', atualizarSenhaUsuarioHttp)
