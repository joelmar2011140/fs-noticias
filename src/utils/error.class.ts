export class APIError extends Error {
  constructor (public nomeDoErro: string = 'SERVER_ERROR', public mensagemDoErro: string = 'Aconteceu um erro inesperado no servidor', public codigoDoErro: number = 500) {
    super(mensagemDoErro)
    this.name = 'APIError'
    this.nomeDoErro = `${this.name}:${nomeDoErro}`
    this.mensagemDoErro = mensagemDoErro
    this.codigoDoErro = codigoDoErro
  }
}
