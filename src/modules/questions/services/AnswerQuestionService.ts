import { inject, injectable } from "tsyringe";

import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import Answer from "../infra/typeorm/schemas/Answers";

import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface IRequest {
  user_id: string;
  question_id: string;
}

/*
[ ] 30 min time limit;
[ ] valid question id;
[ ] check if user already answered 
*/

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ user_id, question_id }: IRequest): Promise<Question> {}
}

export default CreateQuestionService;
