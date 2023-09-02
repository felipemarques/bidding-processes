import { Module } from '@nestjs/common';
import { BiddingController } from './controllers/bidding.controller';
import { BiddingService } from './services/bidding.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [BiddingController],
  providers: [BiddingService],
})
export class AppModule {}
