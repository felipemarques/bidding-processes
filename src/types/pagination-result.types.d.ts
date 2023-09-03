type PaginationResult<T> = {
  pagination: {
    totalCount: number
    page: number
    take: number
    hasMore: boolean
    nextPage: number | null
    prevPage: number | null
  }
  data: T[]
}
