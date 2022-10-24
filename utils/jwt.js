import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';

const verifyToken = token => jwt.verify(token, jwtConfig.secret);

const createToken = data => jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.ttl });

export {verifyToken, createToken}