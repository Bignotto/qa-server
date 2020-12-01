import { Router, Request, Response, request, response } from "express";

import QuestionsController from "../../controllers/QuestionsController";

const questionsRouter = Router();
const questionsController = new QuestionsController();

questionsRouter.get("/:easy_id", questionsController.show);

questionsRouter.post("/", questionsController.create);

export default questionsRouter;
