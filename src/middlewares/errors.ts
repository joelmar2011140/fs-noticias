import type { Request, Response, NextFunction } from 'express'
import { APIError } from '../utils/error.class'
import { type IErro } from '../utils/global.types'

export function errorMiddleware (erro: APIError, req: Request, res: Response<IErro>, next: NextFunction): Response<IErro> {
  console.error(erro)
  if (erro.name === 'APIError') {
    console.error(erro)
    return res.status(erro.codigoDoErro).json({
      data: {
        details: [erro.mensagemDoErro],
        message: erro.mensagemDoErro,
        status: erro.codigoDoErro,
        timestamp: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
        retorno: {
          codigo: erro.codigoDoErro,
          mensagem: erro.mensagemDoErro
        }
      }
    })
  }
  return res.status(500).json({
    data: {
      details: ['Erro no servidor'],
      message: 'Ocorreu um erro inesperado no servidor , caso o problema persistir contacte a equipa de suporte',
      status: 500,
      timestamp: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
      retorno: {
        codigo: 500,
        mensagem: 'Ocorreu um erro inesperado no servidor , caso o problema persistir contacte a equipa de suporte'
      }
    }
  })
}

export function notFoundError (req: Request, res: Response, next: NextFunction): void {
  next(new APIError('NOTFOUND', 'Recurso não encontrado', 404))
}
