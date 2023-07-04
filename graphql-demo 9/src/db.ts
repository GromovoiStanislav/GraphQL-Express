import {DataSource} from "typeorm";
import {DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME} from "./config.js";
import path from 'node:path'
import {fileURLToPath} from 'node:url'
// import { Users } from "./entity/User.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const AppDataSource = new DataSource({
    type: "postgres",
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    synchronize: true,
    // entities: [User],
    entities: [path.join(__dirname, './entity/**/**{.ts,.js}')]
});
