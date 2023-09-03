import { PaginationService } from 'src/services/pagination.service'

describe('PaginationService', () => {
  let paginationService: PaginationService<any>

  beforeEach(() => {
    paginationService = new PaginationService()
  })

  it('should be defined', () => {
    expect(paginationService).toBeDefined()
  })

  it('should paginate results correctly', async () => {
    const queryBuilder = {
      model: {
        countDocuments: jest.fn().mockResolvedValue(100),
      },
      skip: jest.fn(() => queryBuilder),
      limit: jest.fn(() => queryBuilder),
      exec: jest.fn(),
      getQuery: jest.fn(),
    }

    const page = 2
    const take = 10

    const totalCountQuery = {
      exec: jest.fn().mockResolvedValue(100),
    }

    queryBuilder.model.countDocuments.mockReturnValueOnce(totalCountQuery)

    const result = await paginationService.paginationQuery(
      queryBuilder,
      page,
      take,
    )

    expect(queryBuilder.skip).toHaveBeenCalledWith((page - 1) * take)
    expect(queryBuilder.limit).toHaveBeenCalledWith(take)
    expect(queryBuilder.model.countDocuments).toHaveBeenCalled()
    expect(totalCountQuery.exec).toHaveBeenCalled()
    expect(result.pagination.totalCount).toBe(100)
    expect(result.pagination.page).toBe(page)
    expect(result.pagination.take).toBe(take)
  })
})
