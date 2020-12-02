import { inject, injectable } from "tsyringe";
import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import IEasyCodeProvider from "../providers/EasyCodeProvider/models/IEasyCodeProvider";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface IRequest {
  easy_id: string;
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ easy_id }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.findByEasyCode(easy_id);

    if (!question) throw new Error("GetQuestionService: question not found!");

    return question;
  }
}

export default CreateQuestionService;
