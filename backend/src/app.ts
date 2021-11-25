import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 4000
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get("/", (req: any, res: any) => res.send("Hello World"))

app.listen(PORT, () => {
  console.log(`Listening to the smooth sounds of server on PORT: ${PORT}`)
})
