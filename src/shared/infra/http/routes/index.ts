import { Router } from "express";

import questionsRouter from "../../../../modules/questions/infra/http/routes/questions.routes";
import answersRouter from "../../../../modules/questions/infra/http/routes/answers.routes";
import resultsRouter from "../../../../modules/questions/infra/http/routes/results.routes";

const routes = Router();

routes.use("/questions", questionsRouter);
routes.use("/answer", answersRouter);
routes.use("/results", resultsRouter);

export default routes;
