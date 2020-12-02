import { getMongoRepository, MongoRepository } from "typeorm";

import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";

import Question from "../schemas/Question";
import Option from "../schemas/Options";
import Answers from "../schemas/Answers";

import AppError from "../../../../../shared/errors/AppError";

class QuestionsRepository implements IQuestionsRepository {
  private questionsOrmRepository: MongoRepository<Question>;
  private optionsOrmRepository: MongoRepository<Option>;
  private answerOrmRepository: MongoRepository<Answers>;

  constructor() {
    this.questionsOrmRepository = getMongoRepository(Question, "mongo");
    this.optionsOrmRepository = getMongoRepository(Option, "mongo");
    this.answerOrmRepository = getMongoRepository(Answers, "mongo");
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

  public async answer(
    question_id: string,
    option_id: number,
    user_id: string
  ): Promise<Question> {
    const question = await this.findByEasyCode(question_id);
    if (!question) throw new Error("Answer: question not found to answer.");

    const answer = this.answerOrmRepository.create({ user_id });

    const optionIndex = question.options.findIndex(opt => opt.id === option_id);

    if (!question.options[optionIndex].answers)
      question.options[optionIndex].answers = [];

    question.options[optionIndex].answers.push(answer);

    await this.questionsOrmRepository.update(question.id, question);
    return question;
  }

  public async createOption(text: string, id: number): Promise<Option> {
    const option = this.optionsOrmRepository.create({ text, id });
    return option;
  }

  public async findByEasyCode(easy_id: string): Promise<Question | undefined> {
    const question = await this.questionsOrmRepository.findOne({ easy_id });
    return question;
  }

  public async findUserAnswer(
    easy_id: string,
    user_id: string
  ): Promise<Answers | undefined> {
    const question = await this.questionsOrmRepository.findOne({ easy_id });
    if (!question)
      throw new AppError("Question not found", 404, "QuestionRepository");

    let userAnswer: Answers | undefined;

    question.options.forEach(opt => {
      if (opt.answers) {
        userAnswer = opt.answers.find(ans => ans.user_id === user_id);
      }
    });

    return userAnswer;
  }
}

export default QuestionsRepository;
