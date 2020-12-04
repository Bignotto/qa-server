import { Router } from "express";

import ResultsController from "../../controllers/ResultsController";

const answersRouter = Router();
const resultsController = new ResultsController();

answersRouter.get("/:easy_id", resultsController.show);

export default answersRouter;
