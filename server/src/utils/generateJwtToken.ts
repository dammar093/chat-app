import jwt from 'jsonwebtoken';
const generateJwtToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
}

export default generateJwtToken;
