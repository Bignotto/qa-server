import { getMongoRepository, MongoRepository } from "typeorm";

import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";

import Question from "../schemas/Question";
import Option from "../schemas/Options";

class QuestionsRepository implements IQuestionsRepository {
  private questionsOrmRepository: MongoRepository<Question>;
  private optionsOrmRepository: MongoRepository<Option>;

  constructor() {
    this.questionsOrmRepository = getMongoRepository(Question, "mongo");
    this.optionsOrmRepository = getMongoRepository(Option, "mongo");
  }

  public async create({
    text,
    user_id,
    easy_id,
    options,
  }: ICreateQuestionDTO): Promise<Question> {
    const question = this.questionsOrmRepository.create({
      text,
      user_id,
      easy_id,
    });
    question.options = options;

    await this.questionsOrmRepository.save(question);
    return question;
  }

  public async answer(question_id: string): Promise<void> {}

  public async createOption(text: string, id: number): Promise<Option> {
    const option = this.optionsOrmRepository.create({ text, id });
    return option;
  }

  public async findByEasyCode(easy_id: string): Promise<Question | undefined> {
    const question = await this.questionsOrmRepository.findOne({ easy_id });
    return question;
  }
}

export default QuestionsRepository;
