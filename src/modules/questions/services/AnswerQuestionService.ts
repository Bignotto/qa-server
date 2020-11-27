import { inject, injectable } from "tsyringe";

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
    [ ] 30 min time limit;
    [ ] valid question id;
    [ ] check if user already answered 
    */

    const question = await this.questionsRepository.findByEasyCode(question_id);
    if (!question) throw new Error("Answer: cant answer unexistent question.");

    // const onTime = question.created_at;
    // const now = new Date(Date.now());

    const answeredQuestion = await this.questionsRepository.answer(
      question_id,
      option_id,
      user_id
    );
    return answeredQuestion;
  }
}

export default CreateQuestionService;
