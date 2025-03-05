import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false, data: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Unauthorized", success: false, data: null });
  }
}
export default verifyJwtToken;