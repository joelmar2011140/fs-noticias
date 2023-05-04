import Joi from 'joi'

export const validarRegistoNoticia = Joi.object({
  titulo: Joi.string().empty().required().messages({
    'any.required': 'Indique por favor um titulo para esta notícia',
    'string.base': 'Indique por favor umt itulo para esta notícia',
    'string.empty': 'Indique por favor um titulo para esta notícia'
  }),
  destaque: Joi.string().empty().required().messages({
    'any.required': 'Indique por favor um destaque  para esta notícia',
    'string.base': 'Indique por favor um destaque  para esta notícia',
    'string.empty': 'Indique por favor um destaque  para esta notícia'
  }),
  conteudo: Joi.string().empty().required().messages({
    'any.required': 'Indique por favor um conteúdo  para esta notícia',
    'string.base': 'Indique por favor um conteúdo  para esta notícia',
    'string.empty': 'Indique por favor um conteúdo  para esta notícia'
  })
})

export const validarAtualizacaoNoticia = Joi.object({
  titulo: Joi.string().empty().messages({
    'any.required': 'Indique por favor um titulo para esta notícia',
    'string.base': 'Indique por favor umt itulo para esta notícia',
    'string.empty': 'Indique por favor um titulo para esta notícia'
  }),
  destaque: Joi.string().empty().messages({
    'any.required': 'Indique por favor um destaque  para esta notícia',
    'string.base': 'Indique por favor um destaque  para esta notícia',
    'string.empty': 'Indique por favor um destaque  para esta notícia'
  }),
  conteudo: Joi.string().empty().required().messages({
    'any.required': 'Indique por favor um conteúdo  para esta notícia',
    'string.base': 'Indique por favor um conteúdo  para esta notícia',
    'string.empty': 'Indique por favor um conteúdo  para esta notícia'
  })
})
