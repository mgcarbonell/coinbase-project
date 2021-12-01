import dotenv from "dotenv"
import express, { Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import pinoHttp from "pino-http"
import { handle } from "./util/error"
import { logger } from "./util/logger"
import favoriteRoutes from "./routes/favorite.route"
import { currencyRoutes } from "./routes/currency.route"

dotenv.config()

const app = express()
// abstract out vvvvvvvv
const accessList = [process.env.CLIENT_URL]
const options: cors.CorsOptions = {
  origin: accessList,
}
// abstract out ^^^^^^^^
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(pinoHttp({ logger }))
app.use(helmet())
app.use(cors(options))

// sanity check
app.get("/api/v1/health", (req: Request, res: Response) => {
  try {
    res.send({ "sanity check": "sane" }).status(200)
  } catch (error) {
    handle(error)
    res.send({ "sanity check": "insane" }).status(500)
  }
})

// server routing middleware
favoriteRoutes(app)
currencyRoutes(app)

export { app }
