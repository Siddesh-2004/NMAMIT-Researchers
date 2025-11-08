import Router from "express";
import {upload} from "../middlewares/multer.js";
import { addPaper,getInReviewPapers,getAcceptedPapers,getInRevisionPapers,updateAcceptanceStatus,deletePaper} from "../controllers/paper.controller.js";




const paperRoutes = Router();
paperRoutes.post("/add",upload.single("paper"),addPaper);
paperRoutes.get("/getInReviewPapers",getInReviewPapers);
paperRoutes.get("/getAccepted",getAcceptedPapers);
paperRoutes.get("/getInRevision",getInRevisionPapers);
paperRoutes.put("/updateAcceptanceStatus",updateAcceptanceStatus);
paperRoutes.delete("/delete",deletePaper);





export default paperRoutes;