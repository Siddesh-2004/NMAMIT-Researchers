import { Router } from "express";
import { getAllAuthors } from "../controllers/author.controller.js";

const authorRouter = Router();

authorRouter.get("/getAllAuthors", getAllAuthors);

export default authorRouter;