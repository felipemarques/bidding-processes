export type Item = {
  descricao: string
  unidade: string
  quantidade: number
  melhorLance: unknown | null
  valorReferencia: number
  exclusivoME: string
  codigo: number
  codigoInternoLote: number | null
  exibirValorReferencia: number | null
  participacao: {
    codigo: number
    descricao: string
  }
  situacao: {
    codigo: number
    descricao: string
  }
  empate: boolean
  tipoJulgamento: string
  isItensPorcentagem: boolean
}

export type ListItemsDto = {
  isLote: boolean
  itens: {
    result: Array<Item>
    offset: number
    limit: number
    total: number
    pageCount: number
    currentPage: number
    nextPage: number | null
    previousPage: number | null
  }
  lotes: unknown | null
}
