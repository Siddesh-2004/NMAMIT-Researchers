import {Router} from "express";
import { signUpUser ,loginUser,logoutUser } from "../controllers/user.controller.js";

const router=Router();
router.post("/signUp",signUpUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
export default router;