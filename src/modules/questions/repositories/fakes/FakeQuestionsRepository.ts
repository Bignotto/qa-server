import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";

import Question from "../../infra/typeorm/schemas/Question";
import Option from "@modules/questions/infra/typeorm/schemas/Options";

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

  public async findByEasyCode(id: string): Promise<Question | undefined> {
    const findQuestion = this.questions.find(question => {
      question.easy_id === id;
    });

    return findQuestion;
  }

  public async answer(question_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async createOption(text: string, id: number): Promise<Option> {
    const option = new Option();

    Object.assign(option, { text, id });

    return option;
  }
}

export default FakeQuestionsRepository;
