import { Controller, Get, Post, Query } from '@nestjs/common'
import { ListProcessQueryDto } from 'src/dto/list-process-query.dto'
import { BatchOperationService } from 'src/services/batchOperation.service'

@Controller('bidding')
export class BiddingController {
  constructor(private readonly batchService: BatchOperationService) {}

  @Post('start-extraction')
  startBatch(): void {
    this.batchService.startExtraction()
  }

  @Get()
  async getProcess(@Query() query: ListProcessQueryDto) {
    return this.batchService.getProcess(query)
  }
}
