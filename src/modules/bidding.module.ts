import { Module } from '@nestjs/common'
import { BiddingController } from 'src/controllers/bidding.controller'
import { BiddingService } from 'src/services/bidding.service'
import { MongooseModule } from '@nestjs/mongoose'
import { BatchOperation } from 'src/schemas/batch-process.schema'
import { BatchOperationService } from 'src/services/batchOperation.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BatchOperation',
        schema: BatchOperation,
      },
    ]),
  ],
  controllers: [BiddingController],
  providers: [BiddingService, BatchOperationService],
})
export class BiddingModule {}
