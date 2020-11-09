import { inject, injectable } from "tsyringe";
import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface IRequest {
  user_id: string;
  text: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
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
    option_3,
    option_4,
    option_5,
  }: IRequest): Promise<Question> {
    const options = new Array<Option>();

    if (option_1) options.push(new Option(option_1));
    if (option_2) options.push(new Option(option_2));
    if (option_3) options.push(new Option(option_3));
    if (option_4) options.push(new Option(option_4));
    if (option_5) options.push(new Option(option_5));

    const question = await this.questionsRepository.create({
      user_id,
      text,
      options,
    });
    return question;
  }
}

export default CreateQuestionService;
