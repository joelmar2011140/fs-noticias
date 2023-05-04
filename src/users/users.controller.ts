import type { Request, Response, NextFunction } from 'express'
import { atualizarUmUsuario, eliminarUsuario, listarUmUsuario, listarUsuarios, registarUsuario, registarUsuarioAdmin } from './users.service'
import { validarAtualizarUsuario, validarRegistarUsuario } from './users.validations'
import { APIError } from '../utils/error.class'

export async function atualizarUmUsuarioHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const userId = req.params.userId
    const incomingParsedData = await validarAtualizarUsuario.validateAsync(req.body)
    const data = await atualizarUmUsuario(userId, incomingParsedData)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em atualizarUmUsuarioHttp')
    if (err.name === 'APIError') {
      next(err)
    }
    if (err.name === 'ValidationError') {
      for (const detalhe of err.details) {
        next(new APIError('CLIENT_ERROR', detalhe.message, 422))
      }
    }
    next(err)
  }
}

export async function registarUsuarioHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const incomingParsedData = await validarRegistarUsuario.validateAsync(req.body)
    const data = await registarUsuario(incomingParsedData)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em registarUsuarioHttp', err)
    if (err.name === 'ValidationError') {
      for (const detalhe of err.details) {
        next(new APIError('CLIENT_ERROR', detalhe.message, 422))
      }
    } if (err.code === 'P2002') {
      next(new APIError('BAD_REQUEST', 'Já existe um usuário associado à estes dados', 400))
    } if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function registarUsuarioAdminHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const incomingParsedData = await validarRegistarUsuario.validateAsync(req.body)
    const data = await registarUsuarioAdmin(incomingParsedData)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em registarUsuarioAdminHttp', err)
    if (err.name === 'ValidationError') {
      for (const detalhe of err.details) {
        next(new APIError('CLIENT_ERROR', detalhe.message, 422))
      }
    } if (err.code === 'P2002') {
      next(new APIError('BAD_REQUEST', 'Já existe um usuário associado à estes dados', 409))
    } if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function eliminarUsuarioHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const userId = req.params.userId
    const data = await eliminarUsuario(userId)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em eliminarUsuarioHttp')
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function listarUsuarioHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const userId = req.params.userId
    const data = await listarUmUsuario(userId)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em listarUsuarioHttp')
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}

export async function listarUsuariosHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const data = await listarUsuarios()
    return res.status(data.retorno.codigo).json(data)
  } catch (err: any) {
    console.error('Erro em listarUsuariosHttp')
    if (err.name === 'APIError') {
      next(err)
    }
    next(err)
  }
}
