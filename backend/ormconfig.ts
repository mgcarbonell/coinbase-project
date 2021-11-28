import { ConnectionOptions } from "typeorm"
import dotenv from "dotenv"
import { Favorite } from "./src/entity/favorite.entity"

dotenv.config()

export = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME || "postgres",
  password: process.env.TYPEORM_PASSWORD || "postgres",
  database: process.env.TYPEORM_DATABASE,
  synchornize: false,
  logging: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [Favorite],
  migrations: [`src/migrations/**/*.{ts,js}`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migrations",
  },
} as ConnectionOptions

// courtesy of Tigran in Tech