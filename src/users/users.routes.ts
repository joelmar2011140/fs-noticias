import { Router } from 'express'
import { listarUsuariosHttp, registarUsuarioHttp, atualizarUmUsuarioHttp, eliminarUsuarioHttp, listarUsuarioHttp } from './users.controller'

export const rotasUser = Router()

rotasUser.route('/')
  .get(listarUsuariosHttp)
  .post(registarUsuarioHttp)

rotasUser.route('/:userId')
  .get(listarUsuarioHttp)
  .delete(eliminarUsuarioHttp)
  .patch(atualizarUmUsuarioHttp)
