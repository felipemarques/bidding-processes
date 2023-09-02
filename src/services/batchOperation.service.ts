import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { v4 as uuidV4 } from 'uuid'
import { BiddingService } from './bidding.service'
import {
  BatchOperation,
  BatchOperationStatus,
} from 'src/models/BatchProcess.model'

@Injectable()
export class BatchOperationService extends BiddingService {
  constructor(
    @InjectModel('BatchOperation')
    private readonly batchModel: Model<BatchOperation>,
  ) {
    super()
  }

  public async startExtration(): Promise<void> {
    const newBatch = {
      id: uuidV4(),
      status: BatchOperationStatus.IN_PROGRESS,
    }
    const batch = new this.batchModel(newBatch)
    await batch.save()
  }
}
