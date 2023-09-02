import { Controller, Post } from '@nestjs/common'
import { BatchOperationService } from 'src/services/batchOperation.service'

@Controller('bidding')
export class BiddingController {
  constructor(private readonly batchService: BatchOperationService) {}

  @Post('start-extration')
  startBatch(): void {
    this.batchService.startExtration()
  }
}
