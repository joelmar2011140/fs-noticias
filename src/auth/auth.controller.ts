import type { Request, Response, NextFunction } from 'express'
import { loginUsuario, atualizarSenha } from './auth.service'
import { validarLoginUsuario, validarAtualizarSenha } from './auth.validations'
import { APIError } from '../utils/error.class'
import { randomBytes } from 'crypto'
import { prismaClient } from '../lib/prisma.client'

export async function loginUsuarioHttp (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const incomingParsedData = await validarLoginUsuario.validateAsync(req.body)
    const data = await loginUsuario(incomingParsedData)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em loginUsuarioHttp')
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

export async function atualizarSenhaUsuarioHttp (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    const usuario = req.user
    const incomingParsedData = await validarAtualizarSenha.validateAsync(req.body)
    const data = await atualizarSenha(usuario.userId, incomingParsedData)
    return res.status(data.retorno.codigo).json({
      retorno: {
        codigo: data.retorno.codigo,
        mensagem: data.retorno.mensagem,
        data: data.retorno.data
      }
    })
  } catch (err: any) {
    console.error('Erro em atualizarSenhaUsuario')
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

export async function generateKeyHttp (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    if (req.body.email == null) {
      return res.sendStatus(403)
    } else if (req.body.email !== 'wagnermauro96@hotmail.com') {
      return res.sendStatus(403)
    }
    const key = randomBytes(12).toString('hex')
    await prismaClient.userKeys.create({ data: { key, userEmail: req.body.email } })
    return res.status(201).json(key)
  } catch (err: any) {
    console.error('Erro em generateKeyHttp')
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

export async function grantAcessHttp (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    if (req.body.key == null) {
      return res.sendStatus(403)
    } if (req.body.email == null) {
      return res.send('Insira o email do usuário a ser dado o acesso')
    }
    const userKey = await prismaClient.userKeys.findUnique({ where: { key: req.body.key } })
    if (userKey == null) {
      return res.sendStatus(403)
    }
    const key = randomBytes(12).toString('hex')
    await prismaClient.userKeys.create({ data: { key, userEmail: req.body.email } })
    return res.status(201).json(key)
  } catch (err: any) {
    console.error('Erro em grantAcessHttp')
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

export async function perfiUsuario (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    const usuario = req.user
    return res.status(200).json({
      retorno: {
        codigo: 200,
        mensagem: 'Usuário retornado com sucesso',
        data: usuario
      }
    })
  } catch (err: any) {
    console.error('Erro em perfiUsuario')
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
