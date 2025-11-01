import express,{Router} from "express";
import { loginAdmin,logoutAdmin,verifyJwtAdmin } from "../controllers/admin.controller.js";

const router=Router();
router.post("/login",loginAdmin);
router.post("/logout",logoutAdmin);
router.get("/verifyJwt",verifyJwtAdmin);
export default router;