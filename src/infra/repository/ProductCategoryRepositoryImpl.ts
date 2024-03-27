import Params from "../../application/dto/Params";
import ProductCategory from "../../domain/entity/ProductCategory";
import { ProductCategoryRepository } from "../../domain/repository/ProductCategoryRepository";
import { Repository } from "typeorm";

export default class ProductCategoryRepositoryImpl implements ProductCategoryRepository {
  constructor(private readonly typeOrmRepository: Repository<ProductCategory>) {}

  async findAll(params: Params) {
    return await this.typeOrmRepository.find({
      order: { name: params.order },
      skip: Number(params.page) * Number(params.page_size),
      take: Number(params.page_size),
    });
  }

  async findById(id: string) {
    return await this.typeOrmRepository.findOneBy({
      id: id,
    });
  }

  async findByName(name: string) {
    return await this.typeOrmRepository.findOneBy({
      name: name,
    });
  }

  async save(entity: ProductCategory) {
    return await this.typeOrmRepository.save(entity);
  }

  async delete(id: string) {
    await this.typeOrmRepository.delete(id);
  }
}
