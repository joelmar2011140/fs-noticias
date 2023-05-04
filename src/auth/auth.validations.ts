import Joi from 'joi'

export const validarLoginUsuario = Joi.object({
  email: Joi.string().email().empty().required().messages({
    'any.required': 'Forneça por favor um email',
    'string.base': 'Forneça por favor um email',
    'string.email': 'Forneça por favor um email válido',
    'string.empty': 'Forneça por favor um email'
  }),
  senha: Joi.string().empty().required().messages({
    'any.required': 'Forneça por favor uma senha',
    'string.base': 'Forneça por favor uma senha',
    'string.empty': 'Forneça por favor uma senha'
  })
})

export const validarAtualizarSenha = Joi.object({
  senhaAntiga: Joi.string().email().empty().required().messages({
    'any.required': 'Forneça por favor a senha antiga',
    'string.base': 'Forneça por favor a senha antiga',
    'string.empty': 'Forneça por favor a senha antiga'
  }),
  novaSenha: Joi.string().min(6).empty().required().messages({
    'any.required': 'Forneça por favor uma nova senha',
    'string.base': 'Forneça por favor uma nova senha',
    'string.empty': 'Forneça por favor uma nova senha'
  })
})
