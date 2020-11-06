import { Router } from "express";

import questionsRouter from "../../../../modules/questions/infra/http/routes/questions.routes";

const routes = Router();

routes.use("/questions", questionsRouter);

export default routes;
