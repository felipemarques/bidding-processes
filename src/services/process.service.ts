import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ImportedProcess } from 'src/models/imported-process.model'
import { Model } from 'mongoose'
import { PaginationService } from 'src/services/pagination.service'
import { ListProcessQueryDto } from 'src/dto/list-process-query.dto'

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel('ImportedProcess')
    private readonly importedProcessModel: Model<ImportedProcess>,
    private readonly paginationService: PaginationService<ImportedProcess>,
  ) {}

  async getProcesses(query: ListProcessQueryDto) {
    const { page, take, ...filters } = query

    const filterMappings: Record<string, (value: string) => void> = {
      startDate: (value) => ({ startDate: value }),
      processNumber: (value) => ({ processNumber: value }),
      summary: (value) => ({ summary: { $regex: new RegExp(value, 'i') } }),
      itemDescription: (value) => ({
        itemDescription: { $regex: new RegExp(value, 'i') },
      }),
    }

    const filterConditions = Object.entries(filters)
      .filter(([field]) => filterMappings[field])
      .map(([field, value]) => filterMappings[field](value))

    const filterCriteria = Object.assign({}, ...filterConditions)

    const queryBuilder = this.importedProcessModel.find(filterCriteria)

    return this.paginationService.paginationQuery(queryBuilder, page, take)
  }
}
