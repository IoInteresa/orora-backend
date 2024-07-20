import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const { JWT_ACCESS_SECRET } = process.env;

class JwtManager {
    public generateToken = (id: string) => {
        return jwt.sign({ id }, JWT_ACCESS_SECRET!);
    };

    public verifyToken = (token: string) => {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET!) as jwt.JwtPayload;
        return decoded;
    };
}

export default JwtManager;
