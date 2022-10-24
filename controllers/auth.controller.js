import User from '../models/user.model.js'
import { set } from '../utils/cache.js'
import jwtConfig from '../config/jwt.js'
import {createToken} from '../utils/jwt.js'
import bcrypt from 'bcrypt'

const register = async (req, res) => {
    const isExist = await User.findOne({
        where:{
            email: req.body.email
        }
    })
    if (isExist) {
        return res.status(400).json({ error: 'Email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        return res.json(user);
    } catch (e) {
        console.log(e.message);
    }
}

const login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        /** проверяем hash пароля ранее зарезанного пользователя */
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if (isMatched) {
            /** создаём новый токен для пользователя */
            const token = await createToken({ id: user.id });
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(401).json({ error: 'Unauthorized' });
}

const getUser = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    return res.json(user);
}

const logout = async (req, res) => {
    const token = req.token;
    const now = new Date();
    const expire = new Date(req.user.exp);
    const milliseconds = now.getTime() - expire.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    await set(token, token, milliseconds);

    return res.json({ message: 'Logged out successfully' });
}

export {register, login, getUser, logout}