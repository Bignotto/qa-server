import { Request, Response } from "express";
//import { container } from 'tsyringe';

//import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { text, user_id } = request.body;

    //need this when not using celebrate
    //const parsedDate = parseISO(date);

    //const createAppointment = container.resolve(CreateAppointmentService);

    // const appointment = await createAppointment.execute({
    //     date,
    //     provider_id,
    //     user_id,
    // });

    return response.json({ text, user_id });
  }
}
