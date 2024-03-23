export interface BaseRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
  save: (entity: T) => Promise<T>;
}
