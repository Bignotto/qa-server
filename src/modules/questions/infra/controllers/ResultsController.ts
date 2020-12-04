import { Request, Response } from "express";
import { container } from "tsyringe";

import GetQuestionResultsService from "../../services/GetQuestionResultsService";

export default class ResultsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { easy_id } = request.params;

    const getQuestionResultsService = container.resolve(
      GetQuestionResultsService
    );

    const results = await getQuestionResultsService.execute({ easy_id });

    return response.json(results);
  }
}
