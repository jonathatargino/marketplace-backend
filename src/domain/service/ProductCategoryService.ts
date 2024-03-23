import ProductCategoryCreate from "../../application/dto/ProductCategory/ProductCategoryCreate";
import ProductCategory from "../entity/ProductCategory";
import { HttpError } from "../error/HttpError";
import { ProductCategoryRepository } from "../repository/ProductCategoryRepository";

export default class ProductCategoryService {
  constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

  async findAll() {
    return this.productCategoryRepository.findAll();
  }

  async findById(id: string) {
    const productCategory = this.productCategoryRepository.findById(id);

    if (!productCategory) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    return productCategory;
  }

  async create(productCategoryDTO: ProductCategoryCreate) {
    if (!this.productCategoryRepository.findByName(productCategoryDTO.name)) {
      throw new HttpError(400, "Já existe uma categoria de produto utilizando este nome");
    }

    const productCategoryEntity = new ProductCategory();
    productCategoryEntity.name = productCategoryDTO.name;
    return this.productCategoryRepository.save(productCategoryEntity);
  }

  async update(id: string, productCategoryDTO: ProductCategoryCreate) {
    const productCategoryEntity = await this.findById(id);
    productCategoryEntity.name = productCategoryDTO.name;
    return this.productCategoryRepository.save(productCategoryEntity);
  }

  delete(id: string) {
    if (!this.productCategoryRepository.findById(id)) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    return this.productCategoryRepository.delete(id);
  }
}
