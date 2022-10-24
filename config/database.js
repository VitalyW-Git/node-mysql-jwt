import dotenv from "dotenv";
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
}

export default config