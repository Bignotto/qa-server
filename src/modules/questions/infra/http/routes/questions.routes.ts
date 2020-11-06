import { Router, Request, Response, request, response } from "express";

import QuestionsController from "../../controllers/QuestionsController";

const questionsRoute = Router();
const questionsController = new QuestionsController();

questionsRoute.get("/", (request, response) => {
  response.json({
    message: "Deu certo!",
    sec: "rota questions - get",
  });
});

questionsRoute.post("/", questionsController.create);

export default questionsRoute;
