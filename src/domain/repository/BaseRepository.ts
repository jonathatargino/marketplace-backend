export interface BaseRepository<T> {
  findAll: () => T[];
  findById: (id: string) => T;
  save: (entity: T) => T;
}
