import { Document } from 'mongoose'

export enum BatchOperationStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  FINISHED_WITH_ERROR = 'FINISHED_WITH_ERROR',
}

export interface BatchOperation extends Document {
  id: string
  status: BatchOperationStatus
  changed?: number
  created?: number
  deleted?: number
  createdAt: Date
  updatedAt: Date
}
