import { Module } from '@nestjs/common'
import { BiddingController } from 'src/controllers/bidding.controller'
import { PublicPortalService } from 'src/services/public-portal.service'
import { MongooseModule } from '@nestjs/mongoose'
import { BatchOperation } from 'src/schemas/batch-process.schema'
import { ImportedProcess } from 'src/schemas/imported-process.schema'
import { BatchOperationService } from 'src/services/batchOperation.service'

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
  providers: [PublicPortalService, BatchOperationService],
})
export class BiddingModule {}
