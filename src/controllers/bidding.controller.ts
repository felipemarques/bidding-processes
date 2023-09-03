import { Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ListProcessQueryDto } from 'src/dto/list-process-query.dto'
import { BatchOperationService } from 'src/services/batchOperation.service'
import { ProcessService } from 'src/services/process.service'

@Controller('bidding')
@ApiTags('Bidding')
export class BiddingController {
  constructor(
    private readonly batchService: BatchOperationService,
    private readonly processService: ProcessService,
  ) {}

  @Post('start-extraction')
  startBatch(): void {
    this.batchService.startExtraction()
  }

  @Get()
  async getProcess(@Query() query: ListProcessQueryDto) {
    return this.processService.getProcesses(query)
  }
}
