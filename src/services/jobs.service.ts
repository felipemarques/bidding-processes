import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { BatchOperationService } from './batchOperation.service'

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name)
  constructor(private readonly batchService: BatchOperationService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  handleCron() {
    this.logger.log('Starting extraction from Cron')
    this.batchService.startExtraction()
  }
}
