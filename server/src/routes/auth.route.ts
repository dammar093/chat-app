import { Router } from "express";
import { userLogin, userSignup } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);

export default authRouter;