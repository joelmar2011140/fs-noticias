import { prismaUser } from './users.prisma'
import type { ISucesso } from '../utils/global.types'
import { APIError } from '../utils/error.class'
import type { IParamsAtualizarUsuario, IParamsCriarUsuario } from './users.types'
import { encriptarSenha } from '../helpers/bcrypt.function'

export async function registarUsuario (params: IParamsCriarUsuario): Promise<ISucesso> {
  const { senha, ...rest } = params
  const senhaEncriptada = await encriptarSenha(params.senha)
  const data = await prismaUser.create({ data: { ...rest, senha: senhaEncriptada } })
  if (data == null) {
    throw new APIError('APIERROR', 'Não foi possível registar este usuário , tente novamente, se o erro persistir contacte a equipa de suporte', 503)
  }
  return {
    retorno: {
      codigo: 201,
      mensagem: 'Usuário registado com sucesso',
      data
    }
  }
}

export async function listarUsuarios (): Promise<ISucesso> {
  const usuarios = await prismaUser.findMany({ where: { papel: 'PUBLICADOR' } })
  if (usuarios.length === 0) {
    return {
      retorno: {
        codigo: 204,
        mensagem: 'Lista retornada com sucesso'
      }
    }
  }
  return {
    retorno: {
      codigo: 204,
      mensagem: 'Lista retornada com sucesso',
      data: usuarios.map(usuario => ({ userId: usuario.userId, nome: usuario.nome, email: usuario.email, papel: usuario.papel }))
    }
  }
}

export async function eliminarUsuario (userId: string): Promise<ISucesso> {
  const usuarioEliminado = await prismaUser.delete({ where: { userId } })
  if (usuarioEliminado == null) {
    throw new APIError('CLIENT_ERROR', 'Certifique-se por favor que selecionou o usuário correto', 404)
  }
  const { senha, ...rest } = usuarioEliminado
  return {
    retorno: {
      codigo: 200,
      mensagem: 'Usuário eliminado com sucesso',
      data: rest
    }
  }
}

export async function listarUmUsuario (userId: string): Promise<ISucesso> {
  const usuario = await prismaUser.findUnique({ where: { userId } })
  if (usuario == null) {
    throw new APIError('CLIENT_ERROR', 'Certifique-se por favor que selecionou o usuário correto', 404)
  }
  const { senha, ...rest } = usuario
  return {
    retorno: {
      codigo: 200,
      mensagem: 'Usuário listado com sucesso',
      data: rest
    }
  }
}

export async function atualizarUmUsuario (userId: string, params: IParamsAtualizarUsuario): Promise<ISucesso> {
  if (params.senha != null && params.senha.length > 0) {
    throw new APIError('CLIENT_ERROR', 'Esetja logado para exercer esta funcionalidade', 403)
  }
  const usuarioAtualizado = await prismaUser.update({ where: { userId }, data: { ...params } })
  if (usuarioAtualizado == null) {
    throw new APIError('CLIENT_ERROR', 'Certifique-se por favor que selecionou o usuário correto', 404)
  }
  const { senha, ...rest } = usuarioAtualizado
  return {
    retorno: {
      codigo: 201,
      mensagem: 'Usuário atualizado com sucesso',
      data: rest
    }
  }
}
