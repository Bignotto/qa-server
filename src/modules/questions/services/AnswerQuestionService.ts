import { inject, injectable } from "tsyringe";

import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import Answer from "../infra/typeorm/schemas/Answers";

import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface IRequest {
  user_id: string;
  question_id: string;
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Question> {
    const options = new Array<Option>();

    return question;
  }
}

export default CreateQuestionService;
