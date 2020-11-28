import { Router } from "express";

import questionsRouter from "../../../../modules/questions/infra/http/routes/questions.routes";
import answersRouter from "../../../../modules/questions/infra/http/routes/answers.routes";

const routes = Router();

routes.use("/questions", questionsRouter);
routes.use("/answer", answersRouter);

export default routes;
