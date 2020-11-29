import { inject, injectable } from "tsyringe";
import { differenceInMinutes } from "date-fns";

import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";
import Answer from "../infra/typeorm/schemas/Answers";

import IQuestionsRepository from "../repositories/IQuestionsRepository";
import { response } from "express";
import answersRouter from "../infra/http/routes/answers.routes";

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
    /*
    [x] 30 min time limit;
    [x] valid question id;
    [ ] check if user already answered 
    */

    const question = await this.questionsRepository.findByEasyCode(question_id);
    if (!question)
      throw new Error(
        "AnswerQuestionService: cant answer unexistent question."
      );

    const timeDifference = differenceInMinutes(Date.now(), question.created_at);
    if (timeDifference >= 30)
      throw new Error("AnswerQuestionService: question expired.");

    const answeredQuestion = await this.questionsRepository.answer(
      question_id,
      option_id,
      user_id
    );
    return answeredQuestion;
  }
}

export default CreateQuestionService;
