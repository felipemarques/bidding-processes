type Status = {
  codigo: number
  descricao: string
}

export type PurchasingUnit = {
  codigoUnidadeCompradora: number
  nomeUnidadeCompradora: string
  codigoComprador: number
  nomeComprador: string | null
  cidade: string
  codigoMunicipioIbge: unknown
  uf: string
}

export type BiddingType = {
  codigoModalidadeLicitacao: number
  modalidadeLicitacao: string
  codigoTipoLicitacao: number
  siglaTipoLicitacao: string
  tipoLicitacao: string
  tipoRealizacao: string
  tipoJulgamento: string
}

export type Process = {
  codigoLicitacao: number
  numeroLicitacao: number | null
  identificacao: string
  numero: string
  resumo: string
  razaoSocial: string
  nomeUnidade: string
  status: Status
  situacao: Status
  tipoLicitacao: BiddingType
  codigoSituacaoEdital: number
  codigoTratamentoDiferenciado: number
  dataHoraInicioLances: string
  dataHoraInicioPropostas: string
  dataHoraFinalPropostas: string
  dataHoraFinalLances: number | null
  dataHoraPublicacao: string
  isPublicado: boolean
  unidadeCompradora: PurchasingUnit
  comprador: string | null
  urlReferencia: string
  statusProcessoPublico: Status
  isExclusivoME: boolean
}

export type ListProcessesDto = {
  result: Process[]
  offset: number
  limit: number
  total: number
  pageCount: number
  currentPage: number // This info is broken
  nextPage: number // This info is broken
  previousPage: null // This info is broken
}
