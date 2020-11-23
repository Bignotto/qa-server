import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateQuestionService from "../../services/CreateQuestionService";

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, question_id } = request.body;

    const createQuestion = container.resolve(CreateQuestionService);

    return response.json({
      message: "answer controller",
      user_id,
      question_id,
    });
  }
}
