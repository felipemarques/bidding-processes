import { Document } from 'mongoose'

interface Item {
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
  items?: Array<Item>
  createdAt: Date
  updatedAt: Date
}
