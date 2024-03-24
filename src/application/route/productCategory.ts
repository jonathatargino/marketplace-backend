import { Router } from "express";
import ProductCategoryController from "../controller/ProductCategoryController";
import ProductCategoryService from "../../domain/service/ProductCategoryService";
import ProductCategoryRepositoryImpl from "../../infra/repository/ProductCategoryRepositoryImpl";
import { AppDataSource } from "../../infra/database/config/data-source";
import ProductCategory from "../../domain/entity/ProductCategory";

const router = Router();

const productCategoryController = new ProductCategoryController(
  new ProductCategoryService(new ProductCategoryRepositoryImpl(AppDataSource.getRepository(ProductCategory))),
);

router.get("/productCategory", (req, res) => productCategoryController.findAll(req, res));
router.get("/productCategory/:id", (req, res) => productCategoryController.findById(req, res));
router.post("/productCategory", (req, res) => productCategoryController.create(req, res));
router.put("/productCategory/:id", (req, res) => productCategoryController.update(req, res));
router.delete("/productCategory/:id", (req, res) => productCategoryController.delete(req, res));

export default router;
