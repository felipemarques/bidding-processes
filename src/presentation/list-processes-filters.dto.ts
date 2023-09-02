export enum StatusFilter {
  OPEN = 1,
  IN_PROGRESS = 2,
  FINISHED = 3,
  LOOMING_DESERT = 4,
}

export enum OrderFilter {
  NEW_PUBLISH = 1,
  OLD_PUBLISH = 2,
  NEW_OPEN = 3,
  OLD_OPEN = 4,
}

export enum EspecialFilter {
  NEXT_30_DAYS = 1,
  LAST_30_DAYS = 2,
  OPEN = 3,
  ME = 4,
}

export type ListProcessesParams = {
  codigoJulgamento?: number
  codigoRealizacao?: number
  objeto?: string
  processo?: string
  orgao?: string
  dataInicial?: string
  dataFinal?: string
  tipoData?: number
  codigoStatus?: StatusFilter
  codigoUf?: number
  filtroOrdenacao?: OrderFilter
  filtroEspecial?: number
  pagina: number
}
