export default {
  paginationValues(
    limit: number = 10,
    page: number = 0,
  ): { currentPage: number; offset: number } {
    const realPage = page - 1 < 0 ? 0 : page - 1;
    const currentPage = page <= 0 ? 1 : page;
    const offset = realPage * limit;
    return { currentPage, offset };
  },

  paginatedData(
    [rows, count]: [any[], number],
    currentPage: number,
    limit: number,
  ) {
    const lastPage = Number(Math.ceil(count / limit));
    return { data: rows, currentPage, lastPage, totalCount: count };
  },
};
