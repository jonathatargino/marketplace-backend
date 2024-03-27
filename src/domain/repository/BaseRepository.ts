import Params from "../../application/dto/Params";

export interface BaseRepository<T> {
  findAll: (params: Params) => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  save: (entity: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
