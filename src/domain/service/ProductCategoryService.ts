import ProductCategoryCreate from "../../application/dto/ProductCategory/ProductCategoryCreate";
import ProductCategory from "../entity/ProductCategory";
import { HttpError } from "../error/HttpError";
import { ProductCategoryRepository } from "../repository/ProductCategoryRepository";
import { ProductCategoryResponse } from "../../application/dto/ProductCategory/ProductCategoryResponse";

export default class ProductCategoryService {
  constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

  async findAll() {
    const productCategories = await this.productCategoryRepository.findAll();
    const productCategoryResponseDTOs = productCategories.map(
      (productCategory) => new ProductCategoryResponse(productCategory.id, productCategory.name),
    );

    return productCategoryResponseDTOs;
  }

  async findById(id: string) {
    const productCategory = await this.productCategoryRepository.findById(id);

    if (!productCategory) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    const productCategoryResponseDTO = new ProductCategoryResponse(productCategory.id, productCategory.name);
    return productCategoryResponseDTO;
  }

  async create(productCategoryDTO: ProductCategoryCreate) {
    const productCategoryUsingReceivedName = await this.productCategoryRepository.findByName(productCategoryDTO.name);

    if (productCategoryUsingReceivedName !== null) {
      throw new HttpError(400, "Já existe uma categoria de produto utilizando este nome");
    }

    const productCategoryEntity = new ProductCategory();
    productCategoryEntity.name = productCategoryDTO.name;

    const createdProductCategory = await this.productCategoryRepository.save(productCategoryEntity);

    const productCategoryResponseDTO = new ProductCategoryResponse(
      createdProductCategory.id,
      createdProductCategory.name,
    );

    return productCategoryResponseDTO;
  }

  async update(id: string, productCategoryDTO: ProductCategoryCreate) {
    const productCategory = await this.productCategoryRepository.findById(id);

    if (!productCategory) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    productCategory.name = productCategoryDTO.name;
    return await this.productCategoryRepository.save(productCategory);
  }

  async delete(id: string) {
    const productCategory = await this.productCategoryRepository.findById(id);

    if (!productCategory) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    return await this.productCategoryRepository.delete(id);
  }
}
