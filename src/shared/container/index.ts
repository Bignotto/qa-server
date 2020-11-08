import { container } from "tsyringe";

import IQuestionsRepository from "../../modules/questions/repositories/IQuestionsRepository";
import QuestionsRepository from "../../modules/questions/infra/typeorm/repositories/QuestionsRepository";

container.registerSingleton<IQuestionsRepository>(
  "QuestionsRepository",
  QuestionsRepository
);
