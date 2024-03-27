import { Request, Response } from "express";
import ProductCategoryService from "../../domain/service/ProductCategoryService";
import ProductCategoryCreate from "../dto/ProductCategory/ProductCategoryCreate";
import validateDTO from "../../infra/utils/validateDTO";
import { HttpError } from "../../domain/error/HttpError";
import { validate as uuidValidate } from "uuid";
import Params from "../dto/Params";

export default class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  async findAll(req: Request, res: Response) {
    const { page, page_size, order } = req.query as unknown as Record<string, string>;

    const params = new Params();
    params.page = page;
    params.page_size = page_size;
    params.order = order;

    res.send(await this.productCategoryService.findAll(params));
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!uuidValidate(id)) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    const productCategory = await this.productCategoryService.findById(id);
    res.send(productCategory);
  }

  async create(req: Request, res: Response) {
    const productCategoryDTO = new ProductCategoryCreate();
    productCategoryDTO.name = req.body.name;

    await validateDTO(productCategoryDTO);

    const createdProductCategory = await this.productCategoryService.create(productCategoryDTO);
    res.status(201).send(createdProductCategory);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!uuidValidate(id)) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    const productCategoryDTO = new ProductCategoryCreate();
    productCategoryDTO.name = req.body.name;

    await validateDTO(productCategoryDTO);

    const updatedProductCategory = await this.productCategoryService.update(id, productCategoryDTO);

    res.send(updatedProductCategory);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!uuidValidate(id)) {
      throw new HttpError(404, "Categoria de produto não encontrada");
    }

    await this.productCategoryService.delete(id);
    res.sendStatus(204);
  }
}
