export interface ICriarNoticia {
  titulo: string
  destaque: string
  capa: string
  conteudo: string
}

export interface IAtualizarNoticia extends Partial<ICriarNoticia> {}
