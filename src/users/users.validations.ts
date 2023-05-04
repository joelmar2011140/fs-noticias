import Joi from 'joi'

export const validarRegistarUsuario = Joi.object({
  email: Joi.string().email().empty().required().messages({
    'any.required': 'Forneça por favor um email',
    'string.base': 'Forneça por favor um email',
    'string.email': 'Forneça por favor um email válido',
    'string.empty': 'Forneça por favor um email'
  }),
  nome: Joi.string().empty().required().messages({
    'any.required': 'Forneça por favor o seu nome',
    'string.base': 'Forneça por favor o seu nome',
    'string.empty': 'Forneça por favor o seu nome'
  }),
  senha: Joi.string().min(6).empty().required().messages({
    'any.required': 'Forneça por favor uma senha',
    'string.base': 'Forneça por favor uma senha',
    'string.min': 'Senha deve ter no mínimo 6 carácteres',
    'string.empty': 'Forneça por favor uma senha'
  })
})

export const validarAtualizarUsuario = Joi.object({
  email: Joi.string().email().empty().messages({
    'any.required': 'Forneça por favor um email',
    'string.base': 'Forneça por favor um email',
    'string.email': 'Forneça por favor um email válido',
    'string.empty': 'Forneça por favor um email'
  }),
  nome: Joi.string().empty().messages({
    'any.required': 'Forneça por favor o seu nome',
    'string.base': 'Forneça por favor o seu nome',
    'string.empty': 'Forneça por favor o seu nome'
  }),
  senha: Joi.string().min(6).empty().messages({
    'any.required': 'Forneça por favor uma senha',
    'string.base': 'Forneça por favor uma senha',
    'string.min': 'Senha deve ter no mínimo 6 carácteres',
    'string.empty': 'Forneça por favor uma senha'
  })
})
