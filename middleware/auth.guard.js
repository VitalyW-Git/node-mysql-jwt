import {verifyToken} from '../utils/jwt'
import { get } from '../utils/cache.js'
const guard = async (req, res, next) => {

    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        try {
            token = token.trim();
            /* ---------------------- Check For Blacklisted Tokens ---------------------- */
            const isBlackListed = await get(token);
            if (isBlackListed) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            
            const decoded = await verifyToken(token);
            req.user = decoded;
            req.token = token;
            next();

        } catch (error) { 
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        return res.status(400).json({ error: 'Authorization header is missing.' })
    }
}

export {guard}