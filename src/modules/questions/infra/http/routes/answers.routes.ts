import { Router, Request, Response, request, response } from "express";

import AnswersController from "../../controllers/AnswersController";

const answersRouter = Router();
const answersController = new AnswersController();

answersRouter.get("/", (request, response) => {
  response.json({
    message: "Deu certo!",
    sec: "rota answers - get",
  });
});

answersRouter.post("/", answersController.create);

export default answersRouter;
