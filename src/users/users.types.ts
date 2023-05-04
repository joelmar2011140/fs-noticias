export interface IParamsCriarUsuario {
  email: string
  nome: string
  senha: string
}

export type IParamsAtualizarUsuario = Partial<IParamsCriarUsuario>
