import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateQuestionService from "../../services/CreateQuestionService";

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { text, user_id, option_1, option_2 } = request.body;

    //need this when not using celebrate
    //const parsedDate = parseISO(date);

    const createQuestion = container.resolve(CreateQuestionService);
    const question = await createQuestion.execute({
      user_id,
      text,
      option_1,
      option_2,
    });

    // const appointment = await createAppointment.execute({
    //     date,
    //     provider_id,
    //     user_id,
    // });

    return response.json(question);
  }
}
