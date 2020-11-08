import { Router, Request, Response, request, response } from "express";

import QuestionsController from "../../controllers/QuestionsController";

const questionsRouter = Router();
const questionsController = new QuestionsController();

questionsRouter.get("/", (request, response) => {
  response.json({
    message: "Deu certo!",
    sec: "rota questions - get",
  });
});

questionsRouter.post("/", questionsController.create);

export default questionsRouter;
