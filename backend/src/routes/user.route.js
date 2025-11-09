import {Router} from "express";
import { signUpUser ,loginUser,logoutUser ,verifyJwtUser,getUserByUserName,getCurrentUser} from "../controllers/user.controller.js";

const router=Router();
router.post("/signUp",signUpUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/verifyJwt",verifyJwtUser);
router.post("/findByUserName",getUserByUserName);
router.get("/getCurrentUser",getCurrentUser);
export default router;