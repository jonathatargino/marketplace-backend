import ProductCategory from "../entity/ProductCategory";
import { BaseRepository } from "./BaseRepository";

export interface ProductCategoryRepository extends BaseRepository<ProductCategory> {
  findByName: (name: string) => Promise<ProductCategory | null>;
}
