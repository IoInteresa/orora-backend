import jwt from 'jsonwebtoken';

const { JWT_ACCESS_SECRET } = process.env;

class JwtManager {
  public generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_ACCESS_SECRET!, { expiresIn: '30m' });
  };

  public verifyToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET!) as jwt.JwtPayload;
    return decoded.id as string;
  };
}

export default JwtManager;
