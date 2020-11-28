import { container } from "tsyringe";

import "../../modules/questions/providers";

import IQuestionsRepository from "../../modules/questions/repositories/IQuestionsRepository";
import QuestionsRepository from "../../modules/questions/infra/typeorm/repositories/QuestionsRepository";

container.registerSingleton<IQuestionsRepository>(
  "QuestionsRepository",
  QuestionsRepository
);
