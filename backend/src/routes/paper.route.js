import Router from "express";
import {upload} from "../middlewares/multer.js";
import { addPaper } from "../controllers/paper.controller.js";
const paperRoutes = Router();
paperRoutes.post("/add",upload.single("paper"),addPaper);
export default paperRoutes;