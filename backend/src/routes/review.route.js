import { Router } from "express";
import { addReviewer, deleteReviewer } from "../controllers/reviewer.controller.js";

const reviewRouter = Router();

reviewRouter.post("/add", addReviewer);
reviewRouter.delete("/delete", deleteReviewer);

export default reviewRouter;

