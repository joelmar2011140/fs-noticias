import { Router } from 'express'
import { listarUsuariosHttp, registarUsuarioHttp, atualizarUmUsuarioHttp, eliminarUsuarioHttp, listarUsuarioHttp, registarUsuarioAdminHttp } from './users.controller'
import { authAPI, authAdmin } from '../middlewares/auth'

export const rotasUser = Router()

rotasUser.route('/')
  .get(authAdmin, listarUsuariosHttp)
  .post(registarUsuarioHttp)

rotasUser.post('/admin', authAPI, registarUsuarioAdminHttp)

rotasUser.route('/:userId')
  .get(authAdmin, listarUsuarioHttp)
  .delete(authAdmin, eliminarUsuarioHttp)
  .patch(authAdmin, atualizarUmUsuarioHttp)
