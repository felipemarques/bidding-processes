import { Module } from '@nestjs/common'
import { PaginationService } from 'src/services/pagination.service'

@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
