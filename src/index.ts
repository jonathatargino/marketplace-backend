import 'dotenv/config'
import { AppDataSource } from "./data-source"
import * as express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Hello Worlde!")
})

AppDataSource.initialize().then(async () => {
    app.listen(process.env.APP_PORT, () => console.log(`Server running at ${process.env.APP_PORT}`))
}).catch(error => console.log(error))

