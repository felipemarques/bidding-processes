import { Controller, Get, Param, Query } from '@nestjs/common'
import { ListItemsParams } from 'src/presentation/list-items-filters.dto'
import { ListItemsDto } from 'src/presentation/list-items.dto'
import { ListProcessesParams } from 'src/presentation/list-processes-filters.dto'
import { ListProcessesDto } from 'src/presentation/list-processes.dto'
import { BiddingService } from 'src/services/bidding.service'

@Controller('bidding')
export class BiddingController {
  constructor(private readonly biddingService: BiddingService) {}

  @Get('processes')
  listProcesses(
    @Query() params: ListProcessesParams,
  ): Promise<ListProcessesDto> {
    return this.biddingService.listProcesses(params)
  }

  @Get('items/:id')
  listItems(
    @Param() { id }: { id: string },
    @Query() params: ListItemsParams,
  ): Promise<ListItemsDto> {
    return this.biddingService.ListItems(+id, params)
  }
}
