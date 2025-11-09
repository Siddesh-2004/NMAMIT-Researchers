import Router from "express";
import {upload} from "../middlewares/multer.js";
import { addPaper,getInReviewPapers,updateAcceptanceStatus} from "../controllers/paper.controller.js";




const paperRoutes = Router();
paperRoutes.post("/add",upload.single("paper"),addPaper);
paperRoutes.get("/getInReviewPapers",getInReviewPapers);
paperRoutes.put("/updateAcceptanceStatus",updateAcceptanceStatus);





export default paperRoutes;