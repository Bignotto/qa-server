import { inject, injectable } from "tsyringe";
import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import IEasyCodeProvider from "../providers/EasyCodeProvider/models/IEasyCodeProvider";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

import AppError from "../../../shared/errors/AppError";

interface IRequest {
  user_id?: string;
  text?: string;
  option_1?: string;
  option_2?: string;
  option_3?: string;
  option_4?: string;
  option_5?: string;
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
    //this block must go to easy code provider logic!
    const maxError = 3;
    let errorCount = 0;

    let easy_id = this.easyCodeProvider.generateCode("qqq");
    let foundQuestion: Question | undefined;

    while (errorCount < maxError) {
      foundQuestion = await this.questionsRepository.findByEasyCode(easy_id);
      if (foundQuestion !== undefined) {
        errorCount++;
        easy_id = this.easyCodeProvider.generateCode("qqq");
      } else break;
    }

    if (errorCount === maxError)
      throw new AppError("EasyCode full!", 400, "CreateQuestionService");
    //--

    if (!user_id)
      throw new AppError(
        "Cant create question without user identification.",
        400,
        "CreateQuestionService"
      );
    if (!text)
      throw new AppError(
        "Cant create question without a question text.",
        400,
        "CreateQuestionService"
      );

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

    if (options.length < 2)
      throw new AppError(
        "Cant create question with only one option.",
        400,
        "CreateQuestionService"
      );

    const question = await this.questionsRepository.create({
      text,
      user_id,
      easy_id,
      options,
    });
    return question;
  }
}

export default CreateQuestionService;
