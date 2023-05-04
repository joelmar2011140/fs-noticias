import { Router } from 'express'
import { eliminarNoticiaHttp, listarNoticiasVisiveisHttp, listarNoticiaHttp, listarNoticiasHttp, mudarEstadoNoticiaHttp, registarNoticiaHttp, atualizarNoticiaHttp } from './noticias.controller'
import { authPublicador } from '../middlewares/auth'

export const rotasNoticias = Router()

rotasNoticias.get('/all', listarNoticiasVisiveisHttp)
rotasNoticias.route('/')
  .get(authPublicador, listarNoticiasHttp)
  .post(authPublicador, registarNoticiaHttp)

rotasNoticias.route('/:noticiaId')
  .get(listarNoticiaHttp)
  .patch(authPublicador, atualizarNoticiaHttp)
  .delete(authPublicador, authPublicador, eliminarNoticiaHttp)

rotasNoticias.patch('/:noticiaId/:estadoNoticia', authPublicador, mudarEstadoNoticiaHttp)
