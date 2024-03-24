import { Request, Response } from "express";
import ProductCategoryService from "../../domain/service/ProductCategoryService";

export default class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  async findAll(req: Request, res: Response) {
    res.send(await this.productCategoryService.findAll());
  }
}
