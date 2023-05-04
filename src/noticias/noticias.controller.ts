import type { Request, Response, NextFunction } from 'express'
import { APIError } from '../utils/error.class'
import { formidableInst } from '../lib/formidable.instance'
import { listarNoticia, eliminarNoticia, listarNoticias, listarNoticiasVisiveis, mudarEstadoNoticia, registarNoticia, atualizarNoticia } from './noticias.services'
import { deleteFile, deleteImageFromAzure, uploadImageToAzure } from '../helpers/azure.upload'
import { validarAtualizacaoNoticia, validarRegistoNoticia } from './noticias.validations'

export async function listarNoticiasHttp (req: Request<any>, res: Response, next: NextFunction): Promise<any> {
  try {
    const data = await listarNoticias()
    return res.status(200).json(data)
  } catch (err: any) {
    console.error('Erro em listarNoticiasHttp', err)
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function listarNoticiasVisiveisHttp (req: Request<any>, res: Response, next: NextFunction): Promise<any> {
  try {
    const pagina = parseInt(req.query.pagina as string)
    const porPagina = parseInt(req.query.porPagina as string)
    const sq = req.query.sq as string
    const data = await listarNoticiasVisiveis(pagina, porPagina, sq)
    return res.status(200).json(data)
  } catch (err: any) {
    console.error('Erro em listarNoticiasVisiveisHttp', err)
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function mudarEstadoNoticiaHttp (req: Request<any>, res: Response, next: NextFunction): Promise<any> {
  try {
    const estadoNoticia = Boolean(req.params.estadoNoticia)
    const noticiaId = req.params.noticiaId
    const data = await mudarEstadoNoticia(noticiaId, estadoNoticia)
    return res.status(data.retorno.codigo).json(data)
  } catch (err: any) {
    console.error('Erro em mudarEstadoNoticiaHttp', err)
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function listarNoticiaHttp (req: Request<any>, res: Response, next: NextFunction): Promise<any> {
  try {
    const noticiaId = req.params.noticiaId
    const data = await listarNoticia(noticiaId)
    return res.status(data.retorno.codigo).json(data)
  } catch (err: any) {
    console.error('Erro em listarNoticiaHttp', err)
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function eliminarNoticiaHttp (req: Request<any>, res: Response, next: NextFunction): Promise<any> {
  try {
    const noticiaId = req.params.noticiaId
    const data = await eliminarNoticia(noticiaId)
    return res.status(data.retorno.codigo).json(data)
  } catch (err: any) {
    console.error('Erro em eliminarNoticiaHttp', err)
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function atualizarNoticiaHttp (req: Request<any>, res: Response, next: NextFunction): Promise<any> {
  const noticiaId = req.params.noticiaId
  formidableInst.parse(req, async (err: any, fields: any, files: any) => {
    try {
      if (err != null) {
        console.error(err)
        deleteFile(files.capa.filepath)
      } if (files.capa != null) {
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'].includes(files.capa.mimetype)) {
          deleteFile(files.capa.filepath)
          throw new APIError('CLIENT_ERROR', 'Especifique por favor uma imagem válida', 400)
        }
        await deleteImageFromAzure(files.capa.originalFilename)
        const uploaded = await uploadImageToAzure(files.capa.originalFilename, files.capa)
        if (uploaded.length > 0) {
          const serializedData = { capa: uploaded }
          const resposta: any = await atualizarNoticia(noticiaId, serializedData)
          return res.status(resposta.retorno.codigo).json(resposta)
        }
      }
      const data = await validarAtualizacaoNoticia.validateAsync(fields)
      const resposta: any = await atualizarNoticia(noticiaId, data)
      return res.status(resposta.retorno.codigo).json(resposta)
    } catch (err: any) {
      console.error('error em atualizarNoticiaHttp ', err)
      if (files?.capa != null) {
        await deleteImageFromAzure(files.capa.originalFilename)
        deleteFile(files.capa.filepath)
      }
      if (err.name === 'ValidationError') {
        for (const detalhe of err.details) {
          next(new APIError('CLIENT_ERROR', detalhe.message, 400))
        }
      } if (err.name === 'APIError') {
        next(err)
      }
      next(err)
    }
  })
}

export async function registarNoticiaHttp (req: any, res: Response, next: NextFunction): Promise<any> {
  const userId = req.user.userId
  formidableInst.parse(req, async (err: any, fields: any, files: any) => {
    try {
      if (err != null) {
        console.error(err)
        deleteFile(files.capa.filepath)
      } if (files.capa == null) {
        throw new APIError('CLIENT_ERROR', 'Especifique por favor uma imagem para à capa da notícia', 400)
      } if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'].includes(files.capa.mimetype)) {
        deleteFile(files.capa.filepath)
        throw new APIError('CLIENT_ERROR', 'Especifique por favor uma imagem válida', 400)
      }
      const data = await validarRegistoNoticia.validateAsync(fields)
      const uploaded = await uploadImageToAzure(files.capa.originalFilename, files.capa)
      if (uploaded.length > 0) {
        const serializedData = { ...data, capa: uploaded }
        const resposta: any = await registarNoticia(userId, serializedData)
        return res.status(resposta.retorno.codigo).json(resposta)
      }
    } catch (err: any) {
      console.error('error em registarNoticiaHttp ', err)
      if (err.name === 'APIError') {
        next(err)
      }
      await deleteImageFromAzure(files.capa.originalFilename)
      deleteFile(files.capa.filepath)
      if (err.name === 'ValidationError') {
        for (const detalhe of err.details) {
          next(new APIError('CLIENT_ERROR', detalhe.message, 400))
        }
      }
      next(err)
    }
  })
}
