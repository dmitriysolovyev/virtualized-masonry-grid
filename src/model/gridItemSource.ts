export type Pagination = {
  page: number;
  size: number;
}

export interface GridItemSource<T> {
  getItem(id: number): Promise<T>
  getPage(pagination: Pagination): Promise<T[]>
}