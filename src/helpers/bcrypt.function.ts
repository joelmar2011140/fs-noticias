import { compare, genSalt, hash } from 'bcrypt'
import { APIError } from '../utils/error.class'

export async function encriptarSenha (senha: string): Promise<string> {
  try {
    const saltos = await genSalt(12)
    const senhaEncriptada = await hash(senha, saltos)
    return senhaEncriptada
  } catch (err: any) {
    console.log('Erro em encriptarSenha ', err)
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  }
}

export async function compararSenhas (senhaNormal: string, senhaEncriptada: string): Promise<boolean> {
  try {
    const areEquals = await compare(senhaNormal, senhaEncriptada)
    return areEquals
  } catch (err: any) {
    console.log('Erro em compararSenhas ', err)
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  }
}
