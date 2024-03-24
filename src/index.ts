import "dotenv/config";
import "express-async-errors";
import { AppDataSource } from "./infra/database/config/data-source";
import * as express from "express";
import router from "./application/route/productCategory";
import httpErrorHandler from "./application/middleware/httpErrorHandler";
import validationErrorHandler from "./application/middleware/validationErrorHandler";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use(router);
    app.use(httpErrorHandler);
    app.use(validationErrorHandler);
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server running at ${process.env.APP_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
