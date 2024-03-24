import ProductCategoryCreate from "../../application/dto/ProductCategory/ProductCategoryCreate";
import ProductCategory from "../entity/ProductCategory";
import { HttpError } from "../error/HttpError";
import { ProductCategoryRepository } from "../repository/ProductCategoryRepository";
import { validate as uuidValidate } from "uuid";

export default class ProductCategoryService {
  constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

  async findAll() {
    return await this.productCategoryRepository.findAll();
  }

  async findById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    const productCategory = await this.productCategoryRepository.findById(id);

    if (!productCategory) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    return productCategory;
  }

  async create(productCategoryDTO: ProductCategoryCreate) {
    const productCategoryUsingReceivedName = await this.productCategoryRepository.findByName(productCategoryDTO.name);

    if (productCategoryUsingReceivedName !== null) {
      throw new HttpError(400, "Já existe uma categoria de produto utilizando este nome");
    }

    const productCategoryEntity = new ProductCategory();
    productCategoryEntity.name = productCategoryDTO.name;
    return await this.productCategoryRepository.save(productCategoryEntity);
  }

  async update(id: string, productCategoryDTO: ProductCategoryCreate) {
    const productCategoryEntity = await this.findById(id);
    productCategoryEntity.name = productCategoryDTO.name;
    return await this.productCategoryRepository.save(productCategoryEntity);
  }

  async delete(id: string) {
    const productCategory = await this.productCategoryRepository.findById(id);

    if (!productCategory) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    return await this.productCategoryRepository.delete(id);
  }
}
