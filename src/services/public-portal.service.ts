import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { ListItemsParams } from 'src/dto/list-items-filters.dto'
import { ListItemsDto } from 'src/dto/list-items.dto'
import { ListProcessesParams } from 'src/dto/list-processes-filters.dto'
import { ListProcessesDto, Process } from 'src/dto/list-processes.dto'

@Injectable()
export class PublicPortalService {
  private httpClient: AxiosInstance
  private readonly biddingUri = '/v2/licitacao'
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.PUBLIC_PORTAL_BASE_URL || '',
    })
  }

  public async listProcesses(
    params: ListProcessesParams,
  ): Promise<ListProcessesDto> {
    const { data } = await this.httpClient.get<ListProcessesDto>(
      `${this.biddingUri}/processos`,
      { params },
    )

    return data
  }

  public async ListItems(
    id: Process['codigoLicitacao'],
    params: ListItemsParams,
  ): Promise<ListItemsDto> {
    const { data } = await this.httpClient.get<ListItemsDto>(
      `${this.biddingUri}/${id}/itens`,
      { params },
    )

    return data
  }
}
