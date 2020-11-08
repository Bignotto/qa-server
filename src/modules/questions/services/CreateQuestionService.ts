import { inject, injectable } from "tsyringe";
import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface IRequest {
  user_id: string;
  text: string;
  option_1: string;
  option_2: string;
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    user_id,
    text,
    option_1,
    option_2,
  }: IRequest): Promise<Question> {
    const options = new Array<Option>();

    options.push(new Option(option_1));
    options.push(new Option(option_2));

    const question = await this.questionsRepository.create({
      user_id,
      text,
      options,
    });
    return question;
  }
}

export default CreateQuestionService;
