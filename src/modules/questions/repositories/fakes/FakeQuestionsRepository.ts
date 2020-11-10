import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";

import Question from "../../infra/typeorm/schemas/Question";

class FakeQuestionsRepository implements IQuestionsRepository {
  private questions: Question[] = [];

  public async create({
    user_id,
    text,
    options,
  }: ICreateQuestionDTO): Promise<Question> {
    const question = new Question();

    Object.assign(question, { text, user_id, options, easy_id: "000001" });

    this.questions.push(question);
    return question;
  }

  public async findByEasyId(id: string): Promise<Question | undefined> {
    const findQuestion = this.questions.find(question => {
      question.easy_id === id;
    });

    return findQuestion;
  }
}

export default FakeQuestionsRepository;
