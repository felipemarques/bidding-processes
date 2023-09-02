import { Document } from 'mongoose'

export interface ImportedItem {
  // quantidade
  amount: number
  // valorReferencia
  refValue: number
  // descricao
  description: string
  // participacao.codigo
  participationCode: number
  // codigo
  code: number
}

export interface ImportedProcess extends Document {
  biddingCode: number
  // identificacao
  identification: string
  // numero (número do processo)
  processNumber: string
  // resumo
  summary: string
  // codigoSituacaoEdital
  publicNoticeStatusCode: number
  // status.codigo
  statusCode: number
  // dataHoraInicioLances (Data de início do processo)
  dateTimeStartBids: Date
  items?: Array<ImportedItem>
  createdAt: Date
  updatedAt: Date
}
