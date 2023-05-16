import type { IResultPaginated, ISucesso } from '../utils/global.types'
import { prismaNoticias } from './noticias.prisma'
import type { IAtualizarNoticia, ICriarNoticia } from './noticias.types'
import { APIError } from '../utils/error.class'
import { pesquisar } from '../helpers/filtros'
import { resultadoPaginado } from '../helpers/paginacao'

export async function listarNoticias (): Promise<ISucesso> {
  const noticias = await prismaNoticias.findMany()
  if (noticias.length === 0) {
    return {
      retorno: {
        codigo: 204,
        mensagem: 'Lista retornada com sucesso',
        data: []
      }
    }
  }
  return {
    retorno: {
      codigo: 200,
      mensagem: 'Lista retornada com sucesso',
      data: noticias
    }
  }
}

export async function listarNoticiasVisiveis (pagina: number, porPagina: number, sq?: string): Promise<IResultPaginated> {
  const search: string = sq as string
  const noticias = await prismaNoticias.findMany({ where: { status: true } })
  const resultado = (search != null && search.length > 0)
    ? await resultadoPaginado(pesquisar(noticias, search, ['titulo']), pagina, porPagina)
    : await resultadoPaginado(noticias, pagina, porPagina)
  return resultado
}

export async function registarNoticia (idPublicador: string, params: ICriarNoticia): Promise<ISucesso> {
  const noticiaCriada = await prismaNoticias.create({ data: { ...params, publicador: { connect: { userId: idPublicador } } } })
  if (noticiaCriada == null) {
    throw new APIError('CLIENT_ERROR', 'Não foi possível criar este evento, tente mais tarde, se o problema persistir contacte o administrador', 503)
  }
  return {
    retorno: {
      codigo: 201,
      mensagem: 'Notícia criada com sucesso',
      data: noticiaCriada
    }
  }
}

export async function atualizarNoticia (noticiaId: string, params: IAtualizarNoticia): Promise<ISucesso> {
  if (params.capa != null) {
    const noticiaAtualizada = await prismaNoticias.update({ where: { noticiaId }, data: { capa: params.capa } })
    return {
      retorno: {
        codigo: 201,
        mensagem: 'Notícia atualizada com sucesso.',
        data: noticiaAtualizada
      }
    }
  }
  const noticiaAtualizada = await prismaNoticias.update({ where: { noticiaId }, data: { ...params } })
  if (noticiaAtualizada == null) {
    throw new APIError('UNAVAILABLE', 'Não foi possível atualizar os dados desta notícia ,tente mais tarde por favor ou contacte o adminstrador', 503)
  }
  return {
    retorno: {
      codigo: 201,
      mensagem: 'Notícia atualizada com sucesso.',
      data: noticiaAtualizada
    }
  }
}

export async function listarNoticia (noticiaId: string): Promise<ISucesso> {
  const noticia = await prismaNoticias.findUnique({ where: { noticiaId } })
  if (noticia == null) {
    throw new APIError('NOTFOUND', 'Certifique-se por favor que selecionou a notícia correta', 404)
  }
  return {
    retorno: {
      codigo: 200,
      mensagem: 'Notícia listada com sucesso',
      data: noticia
    }
  }
}

export async function mudarEstadoNoticia (noticiaId: string, estado: boolean): Promise<ISucesso> {
  const noticia = await prismaNoticias.findUnique({ where: { noticiaId } })
  if (noticia == null) {
    throw new APIError('NOTFOUND', 'Certifique-se por favor que selecionou a notícia correta', 404)
  }
  const noticiaAtualizada = await prismaNoticias.update({ where: { noticiaId }, data: { status: estado } })
  if (noticiaAtualizada == null) {
    throw new APIError('UNAVAILABLE', 'Não foi possível atualizar os dados desta notícia ,tente mais tarde por favor ou contacte o adminstrador', 503)
  }
  return {
    retorno: {
      codigo: 200,
      mensagem: 'Notícia listada com sucesso',
      data: noticiaAtualizada
    }
  }
}

export async function eliminarNoticia (noticiaId: string): Promise<ISucesso> {
  const noticia = await prismaNoticias.findUnique({ where: { noticiaId } })
  if (noticia == null) {
    throw new APIError('NOTFOUND', 'Certifique-se por favor que selecionou a notícia correta', 404)
  }
  const noticiaEliminada = await prismaNoticias.delete({ where: { noticiaId } })
  if (noticiaEliminada == null) {
    throw new APIError('UNAVAILABLE', 'Não foi possível eliminar esta notícia ,tente mais tarde por favor ou contacte o adminstrador', 503)
  }
  return {
    retorno: {
      codigo: 200,
      mensagem: 'Notícia eliminada com sucesso',
      data: noticiaEliminada
    }
  }
}
