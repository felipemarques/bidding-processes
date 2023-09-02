import { Module } from '@nestjs/common'
import { BiddingModule } from './bidding.module'
import { JobService } from 'src/services/jobs.service'

@Module({
  imports: [BiddingModule],
  providers: [JobService],
})
export class JobsModule {}
