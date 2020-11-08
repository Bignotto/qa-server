import { getMongoRepository, MongoRepository } from "typeorm";

import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";

import Question from "../schemas/Question";

class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: MongoRepository<Question>;

  constructor() {
    this.ormRepository = getMongoRepository(Question, "mongo");
  }

  public async create({
    user_id,
    text,
    options,
  }: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create({
      text,
      user_id,
    });
    question.options = options;

    await this.ormRepository.save(question);
    return question;
  }
}

export default QuestionsRepository;
