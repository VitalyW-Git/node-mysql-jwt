import express from "express";
import { register, login, getUser, logout } from "../controllers/auth.controller";
import { guard } from "../middleware/auth.guard";
import { validator } from "../utils/validator";
const indexRouter = express.Router();

indexRouter.post('/register', validator('register'), register);
indexRouter.post('/login', validator('login'), login);
indexRouter.get('/user', guard, getUser);
indexRouter.get('/logout', guard, logout);

indexRouter.all('*',  (req, res) => res.status(400).json({'error': 'Bad Request.'}))

export {indexRouter};
