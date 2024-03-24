import { Request, Response } from "express";
import ProductCategoryService from "../../domain/service/ProductCategoryService";
import ProductCategoryCreate from "../dto/ProductCategory/ProductCategoryCreate";

export default class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  async findAll(req: Request, res: Response) {
    res.send(await this.productCategoryService.findAll());
  }

  async findById(req: Request, res: Response) {
    res.send(await this.productCategoryService.findById(req.params.id));
  }

  async create(req: Request, res: Response) {
    const productCategoryDTO = new ProductCategoryCreate(req.body.name);
    res.status(201).send(await this.productCategoryService.create(productCategoryDTO));
  }

  async update(req: Request, res: Response) {
    const productCategoryDTO = new ProductCategoryCreate(req.body.name);
    res.send(await this.productCategoryService.update(req.params.id, productCategoryDTO));
  }

  async delete(req: Request, res: Response) {
    await this.productCategoryService.delete(req.params.id);
    res.sendStatus(204);
  }
}
