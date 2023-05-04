export interface IErro {
  data: {
    timestamp: string
    status: number
    message: string
    details: any[]
    retorno: {
      codigo: number
      mensagem: string
    }
  }

}

export interface ISucesso {
  retorno: {
    codigo: number
    mensagem: string
    data?: any
  }
}

export interface IResultPaginated {
  data: any[]
  quantidadeTotalItems: number
  retorno: object
  paginator: {
    totalResults: number
    pages: number
    currentPage: number
    prevPage: number
    nextPage: number
    perPage: number
    totalCurrentResults: number
  }
}
