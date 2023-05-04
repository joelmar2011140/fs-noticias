import type { ISucesso } from '../utils/global.types'
import { APIError } from '../utils/error.class'
import type { IParamsAtualizarSenha, IParamsLoginUsuario } from './auth.types'
import { criarToken } from '../helpers/jwt.function'
import { prismaUser } from '../users/users.prisma'
import { compararSenhas, encriptarSenha } from '../helpers/bcrypt.function'

export async function loginUsuario (params: IParamsLoginUsuario): Promise<ISucesso> {
  const usuario = await prismaUser.findUnique({ where: { email: params.email } })
  if (usuario == null) {
    throw new APIError('APIERROR', 'Email ou senha inválida', 401)
  }
  const senhasEq = await compararSenhas(params.senha, usuario.senha)
  if (!senhasEq) {
    throw new APIError('APIERROR', 'Email ou senha inválida', 401)
  }
  const token = criarToken({ name: usuario.nome, sub: usuario.userId })
  const data = { token, papel: usuario.papel }
  return {
    retorno: {
      codigo: 201,
      mensagem: 'Usuário identificado com sucesso',
      data
    }
  }
}

export async function atualizarSenha (userId: string, params: IParamsAtualizarSenha): Promise<ISucesso> {
  const { novaSenha, senhaAntiga } = params
  const usuario = await prismaUser.findUnique({ where: { userId } })
  if (usuario == null) {
    throw new APIError('APIERROR', 'Certifique-se que escolheu o usuário correto', 403)
  }
  const senhasEq = await compararSenhas(senhaAntiga, usuario.senha)
  if (!senhasEq) {
    throw new APIError('APIERROR', 'Certifique-se que a senha antiga está correta', 403)
  }
  const senhaEncriptada = await encriptarSenha(novaSenha)
  const usuarioAtualizado = await prismaUser.update({ where: { userId: usuario.userId }, data: { senha: senhaEncriptada } })
  return {
    retorno: {
      codigo: 204,
      mensagem: 'Senha atualizada com sucesso',
      data: usuarioAtualizado
    }
  }
}
