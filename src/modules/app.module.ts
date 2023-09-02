import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { BiddingModule } from './bidding.module'
import { ScheduleModule } from '@nestjs/schedule'
import { JobsModule } from './jobs.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ScheduleModule.forRoot(),
    BiddingModule,
    JobsModule,
  ],
})
export class AppModule {}
