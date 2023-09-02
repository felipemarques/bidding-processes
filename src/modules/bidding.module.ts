import { Module } from '@nestjs/common'
import { BiddingController } from 'src/controllers/bidding.controller'
import { BiddingService } from 'src/services/bidding.service'
import { MongooseModule } from '@nestjs/mongoose'
import { BatchOperation } from 'src/schemas/batch-process.schema'
import { BatchOperationService } from 'src/services/batchOperation.service'
import { ImportedProcess } from 'src/schemas/imported-process.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BatchOperation',
        schema: BatchOperation,
      },
      {
        name: 'ImportedProcess',
        schema: ImportedProcess,
      },
    ]),
  ],
  controllers: [BiddingController],
  providers: [BiddingService, BatchOperationService],
})
export class BiddingModule {}
