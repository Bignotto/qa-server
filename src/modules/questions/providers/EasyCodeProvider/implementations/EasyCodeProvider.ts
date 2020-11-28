import { inject, injectable } from "tsyringe";
import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import IEasyCodeProvider from "../models/IEasyCodeProvider";
import Question from "@modules/questions/infra/typeorm/schemas/Question";

@injectable()
class EasyCodeProvider implements IEasyCodeProvider {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  async generateCode(payload: string): Promise<string> {
    const maxError = 3;
    let errorCount = 0;

    let easy_id = ("00000" + Math.floor(Math.random() * 99999)).slice(-5);
    let foundQuestion: Question | undefined;

    while (errorCount < maxError) {
      foundQuestion = await this.questionsRepository.findByEasyCode(easy_id);
      if (foundQuestion !== undefined) {
        errorCount++;
        easy_id = ("00000" + Math.floor(Math.random() * 99999)).slice(-5);
      } else break;
    }
    if (errorCount === maxError) throw new Error("EasyCode full!");

    // const code = ("00000" + Math.floor(Math.random() * 99999)).slice(-5);
    return easy_id;
  }
}

export default EasyCodeProvider;
