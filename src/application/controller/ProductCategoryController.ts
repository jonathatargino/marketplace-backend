import { Request, Response } from "express";
import ProductCategoryService from "../../domain/service/ProductCategoryService";
import ProductCategoryCreate from "../dto/ProductCategory/ProductCategoryCreate";
import { ProductCategoryResponse } from "../dto/ProductCategory/ProductCategoryResponse";
import validateDTO from "../../infra/utils/validateDTO";

export default class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  async findAll(req: Request, res: Response) {
    const productCategories = await this.productCategoryService.findAll();
    const productCategoryResponseDTOS = productCategories.map(
      (productCategory) => new ProductCategoryResponse(productCategory.id, productCategory.name),
    );
    res.send(productCategoryResponseDTOS);
  }

  async findById(req: Request, res: Response) {
    const productCategory = await this.productCategoryService.findById(req.params.id);
    const productCategoryResponseDTO = new ProductCategoryResponse(productCategory.id, productCategory.name);
    res.send(productCategoryResponseDTO);
  }

  async create(req: Request, res: Response) {
    const productCategoryDTO = new ProductCategoryCreate();
    productCategoryDTO.name = req.body.name;

    await validateDTO(productCategoryDTO);

    const createdProductCategory = await this.productCategoryService.create(productCategoryDTO);
    const productCategoryResponseDTO = new ProductCategoryResponse(
      createdProductCategory.id,
      createdProductCategory.name,
    );
    res.status(201).send(productCategoryResponseDTO);
  }

  async update(req: Request, res: Response) {
    const productCategoryDTO = new ProductCategoryCreate();
    productCategoryDTO.name = req.body.name;

    await validateDTO(productCategoryDTO);

    const updatedProductCategory = await this.productCategoryService.update(req.params.id, productCategoryDTO);
    const productCategoryResponseDTO = new ProductCategoryResponse(
      updatedProductCategory.id,
      updatedProductCategory.name,
    );
    res.send(productCategoryResponseDTO);
  }

  async delete(req: Request, res: Response) {
    await this.productCategoryService.delete(req.params.id);
    res.sendStatus(204);
  }
}
