import { inject, injectable } from "tsyringe";

import Question from "../infra/typeorm/schemas/Question";

import IQuestionsRepository from "../repositories/IQuestionsRepository";

import AppError from "../../../shared/errors/AppError";

interface IRequest {
  easy_id: string;
}

interface IResults {
  question: Question;
  results: {
    [option_id: number]: number;
  };
}

@injectable()
class GetQuestionResultsService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ easy_id }: IRequest): Promise<IResults> {
    const question = await this.questionsRepository.findByEasyCode(easy_id);
    if (!question)
      throw new AppError(
        "Question not found.",
        404,
        "GetQuestionResultsService"
      );

    let results: IResults = { question, results: [] };

    question.options.forEach(opt => {
      if (opt.answers) results.results[opt.id] = opt.answers.length;
      else results.results[opt.id] = 0;
    });

    return results;
  }
}

export default GetQuestionResultsService;
