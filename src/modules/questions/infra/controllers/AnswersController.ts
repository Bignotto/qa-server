import { Request, Response } from "express";
import { container } from "tsyringe";

import AnswerQuestionService from "../../services/AnswerQuestionService";

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, question_id, option_id } = request.body;

    const answerQuestion = container.resolve(AnswerQuestionService);

    const question = await answerQuestion.execute({
      user_id,
      question_id,
      option_id,
    });

    return response.json(question);
  }
}
