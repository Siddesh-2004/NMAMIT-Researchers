import { Router } from "express";
import { getTopicAllTopics } from "../controllers/topic.controller.js";

const topicRouter = Router();

topicRouter.get("/getAllTopics", getTopicAllTopics);

export default topicRouter;