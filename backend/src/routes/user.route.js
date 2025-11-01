import {Router} from "express";
import { signUpUser } from "../controllers/user.controller.js";

const router=Router();
router.post("/signUp",signUpUser);
export default router;