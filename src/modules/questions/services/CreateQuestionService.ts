import { inject, injectable } from "tsyringe";
import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import IEasyCodeProvider from "../providers/EasyCodeProvider/models/IEasyCodeProvider";
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
    private questionsRepository: IQuestionsRepository,

    @inject("EasyCodeProvider")
    private easyCodeProvider: IEasyCodeProvider
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

    if (option_1)
      options.push(await this.questionsRepository.createOption(option_1, 1));
    if (option_2)
      options.push(await this.questionsRepository.createOption(option_2, 2));
    if (option_3)
      options.push(await this.questionsRepository.createOption(option_3, 3));
    if (option_4)
      options.push(await this.questionsRepository.createOption(option_4, 4));
    if (option_5)
      options.push(await this.questionsRepository.createOption(option_5, 5));

    console.log(this.easyCodeProvider.generateCode("qqq"));

    const question = await this.questionsRepository.create({
      user_id,
      text,
      options,
    });
    return question;
  }
}

export default CreateQuestionService;
