import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from 'dotenv';
dotenv.config();
import {indexRouter} from './routes/index.js';

const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 3004;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api', indexRouter);

app.listen(port, () => {
    console.log(`Сервер запущен localhost: ${port}`)
});
