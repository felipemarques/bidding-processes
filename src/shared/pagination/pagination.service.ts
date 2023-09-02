import { Document, Query } from 'mongoose'

export class PaginationService<T extends Document> {
  async paginationQuery<R>(
    queryBuilder: Query<R[], T>,
    page: number,
    take: number,
  ): Promise<PaginationResult<R>> {
    const skip = (page - 1) * take

    const totalCountQuery = queryBuilder.model.countDocuments(
      queryBuilder.getQuery(),
    )
    const totalCount = await totalCountQuery.exec()

    const resultsQuery = queryBuilder.skip(skip).limit(take)
    const results = await resultsQuery.exec()

    const totalPages = Math.ceil(totalCount / take)

    const hasMore = page < totalPages
    const nextPage = hasMore ? page + 1 : null
    const prevPage = page > 1 ? page - 1 : null

    return {
      pagination: {
        totalCount,
        page,
        take,
        hasMore,
        nextPage,
        prevPage,
      },
      data: results,
    }
  }
}
