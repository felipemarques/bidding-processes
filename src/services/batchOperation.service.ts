import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { v4 as uuidV4 } from 'uuid'
import { PublicPortalService } from './public-portal.service'
import {
  BatchOperation,
  BatchOperationStatus,
} from 'src/models/batch-process.model'
import {
  ImportedItem,
  ImportedProcess,
} from 'src/models/imported-process.model'
import { EspecialFilter } from 'src/presentation/list-processes-filters.dto'
import { Process } from 'src/presentation/list-processes.dto'
import { Item } from 'src/presentation/list-items.dto'

@Injectable()
export class BatchOperationService extends PublicPortalService {
  constructor(
    @InjectModel('BatchOperation')
    private readonly batchModel: Model<BatchOperation>,
    @InjectModel('ImportedProcess')
    private readonly importedProcessModel: Model<ImportedProcess>,
  ) {
    super()
  }

  public async startExtraction(): Promise<void> {
    const batch = await this.createBatch()
    try {
      await this.extract(batch)
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

  private async extract(batch: BatchOperation): Promise<void> {
    const iterations = this.getAllProcesses()
    let created = 0
    let changed = 0
    const existingIds = []

    for await (const { processes, progress } of iterations) {
      await Promise.all(
        processes.map(async (process) => {
          const { isNew, id } = await this.saveProcess(process)
          existingIds.push(id)
          if (isNew) {
            created++
          } else {
            changed++
          }
        }),
      )

      batch.progress = progress
      batch.created = created
      batch.changed = changed
      await batch.save()
    }

    const deleetedProcesses = await this.deleteProcesses(existingIds)
    batch.deleted = deleetedProcesses
    await batch.save()
  }

  private async *getAllProcesses(): AsyncGenerator<{
    processes: Process[]
    progress: string
  }> {
    let hasMore = false
    let page = 0

    do {
      page++
      const { result, pageCount } = await this.listProcesses({
        pagina: page,
        filtroEspecial: EspecialFilter.NEXT_30_DAYS,
      })

      hasMore = page !== pageCount

      yield {
        processes: result,
        progress: `${page}/${pageCount}`,
      }
    } while (hasMore)
  }

  private async saveProcess(process: Process): Promise<{
    isNew: boolean
    id: number
  }> {
    const items = await this.getAllItems(process.codigoLicitacao)

    const result = await this.createOrUpdateProcess(
      process.codigoLicitacao,
      this.bindProcessValues(process, items),
    )

    return {
      isNew: result.createdAt.toISOString() === result.updatedAt.toISOString(),
      id: result.biddingCode,
    }
  }

  private async getAllItems(processId: number): Promise<Item[]> {
    const items: Item[] = []

    let hasMore = false
    let page = 0

    do {
      page++
      const { itens } = await this.ListItems(processId, {
        pagina: page,
      })

      const result = itens?.result
      const pageCount = itens?.pageCount

      if (!result) {
        break
      }

      items.push(...result)

      hasMore = page !== pageCount
    } while (hasMore)
    return items
  }

  private async createOrUpdateProcess(
    biddingCode: number,
    process: Partial<ImportedProcess>,
  ): Promise<Partial<ImportedProcess>> {
    return this.importedProcessModel.findOneAndUpdate<Partial<ImportedProcess>>(
      {
        biddingCode,
      },
      process,
      {
        upsert: true,
        runValidators: false,
        new: true,
        projection: { biddingCode: true, createdAt: true, updatedAt: true },
      },
    )
  }

  private bindProcessValues(
    process: Process,
    items: Item[],
  ): Partial<ImportedProcess> {
    return {
      biddingCode: process.codigoLicitacao,
      identification: process.identificacao,
      processNumber: process.numero,
      summary: process.resumo,
      publicNoticeStatusCode: process.codigoSituacaoEdital,
      statusCode: process.status.codigo,
      dateTimeStartBids: new Date(process.dataHoraInicioLances),
      items: items.map(this.bindItems),
    }
  }

  private bindItems(item: Item): ImportedItem {
    return {
      amount: item.quantidade,
      refValue: item.valorReferencia,
      description: item.descricao,
      participationCode: item.participacao.codigo,
      code: item.codigo,
    }
  }

  private async deleteProcesses(existingIds: string[]): Promise<number> {
    const { deletedCount } = await this.importedProcessModel.deleteMany({
      biddingCode: { $nin: existingIds },
    })

    return deletedCount
  }
}
