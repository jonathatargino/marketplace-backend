import "dotenv/config";
import { AppDataSource } from "./infra/database/config/data-source";
import * as express from "express";
import router from "./application/route/productCategory";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(router);

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server running at ${process.env.APP_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
