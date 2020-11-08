import { inject, injectable } from "tsyringe";
import Question from "../infra/typeorm/schemas/Question";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface IRequest {
  user_id: string;
  text: string;
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ user_id, text }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.create({ user_id, text });
    return question;
  }
}

export default CreateQuestionService;
