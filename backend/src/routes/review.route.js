import { Router } from "express";
import { addReviewer, deleteReviewer,getReviewers } from "../controllers/reviewer.controller.js";

const reviewRouter = Router();

reviewRouter.post("/add", addReviewer);
reviewRouter.delete("/delete", deleteReviewer);
reviewRouter.get("/getAllReviewers", getReviewers);

export default reviewRouter;

