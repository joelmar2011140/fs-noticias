import JWT from 'jsonwebtoken'
import { APIError } from '../utils/error.class'

interface IPayload {
  sub: string
  name: string
}

export function criarToken (payload: IPayload): string {
  try {
    const token = JWT.sign(payload, process.env.JWT_KEY as string, { expiresIn: '360d' })
    return token
  } catch (err: any) {
    console.log('Erro em criarToken')
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  }
}

export function verificarToken (token: string): any {
  try {
    const data = JWT.verify(token, process.env.JWT_KEY as string)
    return data
  } catch (err: any) {
    console.log('Erro em verificarToken')
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  }
}
