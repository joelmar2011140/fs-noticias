import { Router } from 'express'
import { listarUsuariosHttp, registarUsuarioHttp, atualizarUmUsuarioHttp, eliminarUsuarioHttp, listarUsuarioHttp, registarUsuarioAdminHttp } from './users.controller'
import { authAPI } from '../middlewares/auth'

export const rotasUser = Router()

rotasUser.route('/')
  .get(listarUsuariosHttp)
  .post(registarUsuarioHttp)

rotasUser.post('/admin', authAPI, registarUsuarioAdminHttp)

rotasUser.route('/:userId')
  .get(listarUsuarioHttp)
  .delete(eliminarUsuarioHttp)
  .patch(atualizarUmUsuarioHttp)
