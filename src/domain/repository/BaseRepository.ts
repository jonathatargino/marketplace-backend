export interface BaseRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  save: (entity: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
