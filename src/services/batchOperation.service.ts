import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { v4 as uuidV4 } from 'uuid'
import { BiddingService } from './bidding.service'
import {
  BatchOperation,
  BatchOperationStatus,
} from 'src/models/batch-process.model'
import { ImportedProcess } from 'src/models/imported-process.model'
import { EspecialFilter } from 'src/presentation/list-processes-filters.dto'
import { Process } from 'src/presentation/list-processes.dto'

@Injectable()
export class BatchOperationService extends BiddingService {
  constructor(
    @InjectModel('BatchOperation')
    private readonly batchModel: Model<BatchOperation>,
    @InjectModel('ImportedProcess')
    private readonly importedProcessModel: Model<ImportedProcess>,
  ) {
    super()
  }

  public async startExtration(): Promise<void> {
    const batch = await this.createBatch()
    try {
      await this.extratBidings(batch)
      batch.status = BatchOperationStatus.FINISHED
      await batch.save()
    } catch (error) {
      batch.error = error.message
      batch.status = BatchOperationStatus.FINISHED_WITH_ERROR
      await batch.save()
    }
  }

  private async createBatch(): Promise<BatchOperation> {
    const newBatch = {
      id: uuidV4(),
      status: BatchOperationStatus.IN_PROGRESS,
    }
    const batch = new this.batchModel(newBatch)
    await batch.save()
    return batch
  }

  private async extratBidings(batch: BatchOperation): Promise<void> {
    let hasMore = false
    let page = 0

    do {
      page++
      const { result, pageCount } = await this.listProcesses({
        pagina: page,
        filtroEspecial: EspecialFilter.NEXT_30_DAYS,
      })

      batch.progress = `${page}/${pageCount}`
      await batch.save()

      const processes = result.map(this.bindProcessValues)

      await this.importedProcessModel.insertMany(processes)

      hasMore = page !== pageCount
    } while (hasMore)

    console.log('finished')
  }

  private bindProcessValues(process: Process): Partial<ImportedProcess> {
    return {
      biddingCode: process.codigoLicitacao,
      identification: process.identificacao,
      processNumber: process.numero,
      summary: process.resumo,
      publicNoticeStatusCode: process.codigoSituacaoEdital,
      statusCode: process.status.codigo,
      dateTimeStartBids: new Date(process.dataHoraInicioLances),
    }
  }
}
