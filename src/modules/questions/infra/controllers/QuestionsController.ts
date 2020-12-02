import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateQuestionService from "../../services/CreateQuestionService";
import GetQuestionService from "../../services/GetQuestionService";

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      text,
      user_id,
      option_1,
      option_2,
      option_3,
      option_4,
      option_5,
    } = request.body;

    const createQuestion = container.resolve(CreateQuestionService);
    const question = await createQuestion.execute({
      user_id,
      text,
      option_1,
      option_2,
      option_3,
      option_4,
      option_5,
    });

    return response.json(question);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { easy_id } = request.params;
    const getQuestion = container.resolve(GetQuestionService);
    const question = await getQuestion.execute({ easy_id });
    return response.json(question);
  }
}
