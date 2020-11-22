import { Router, Request, Response, request, response } from "express";

import QuestionsController from "../../controllers/QuestionsController";

const answersRouter = Router();
const questionsController = new QuestionsController();

answersRouter.get("/", (request, response) => {
  response.json({
    message: "Deu certo!",
    sec: "rota questions - get",
  });
});

answersRouter.post("/", questionsController.create);

export default answersRouter;
