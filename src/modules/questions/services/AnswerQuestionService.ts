import { inject, injectable } from "tsyringe";
import { differenceInMinutes } from "date-fns";

import Question from "../infra/typeorm/schemas/Question";

import IQuestionsRepository from "../repositories/IQuestionsRepository";

import AppError from "../../../shared/errors/AppError";

interface IRequest {
  user_id: string;
  question_id: string;
  option_id: number;
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    user_id,
    question_id,
    option_id,
  }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.findByEasyCode(question_id);
    if (!question)
      throw new AppError("Question not found.", 400, "AnswerQuestionService");

    const timeDifference = differenceInMinutes(Date.now(), question.created_at);
    if (timeDifference >= 30)
      throw new AppError("Question expired.", 400, "AnswerQuestionService");

    if (user_id === question.user_id)
      throw new AppError(
        "User cant answer his own question.",
        400,
        "AnswerQuestionService"
      );

    const foundUser = await this.questionsRepository.findUserAnswer(
      question_id,
      user_id
    );

    if (foundUser !== undefined)
      throw new AppError(
        "User already answered this question.",
        400,
        "AnswerQuestionService"
      );

    const answeredQuestion = await this.questionsRepository.answer(
      question_id,
      option_id,
      user_id
    );
    return answeredQuestion;
  }
}

export default CreateQuestionService;
