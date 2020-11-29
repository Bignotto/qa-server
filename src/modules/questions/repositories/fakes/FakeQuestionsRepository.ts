import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";

import Question from "../../infra/typeorm/schemas/Question";
import Option from "@modules/questions/infra/typeorm/schemas/Options";
import Answers from "@modules/questions/infra/typeorm/schemas/Answers";

class FakeQuestionsRepository implements IQuestionsRepository {
  private questions: Question[] = [];

  public async create({
    text,
    user_id,
    easy_id,
    options,
  }: ICreateQuestionDTO): Promise<Question> {
    const question = new Question();

    Object.assign(question, { text, user_id, options, easy_id });

    this.questions.push(question);
    return question;
  }

  public async findByEasyCode(id: string): Promise<Question | undefined> {
    const findQuestion = this.questions.find(
      question => question.easy_id === id
    );

    return findQuestion;
  }

  public async answer(
    question_id: string,
    option_id: number,
    user_id: string
  ): Promise<Question> {
    const questionIndex = this.questions.findIndex(
      question => question.easy_id === question_id
    );

    if (questionIndex < 0)
      throw new Error("FakeQuestionsRepository: question not found");

    const answer = new Answers();
    Object.assign(answer, { user_id });

    const optionIndex = this.questions[questionIndex].options.findIndex(
      opt => opt.id === option_id
    );

    if (!this.questions[questionIndex].options[optionIndex].answers)
      this.questions[questionIndex].options[optionIndex].answers = [];

    this.questions[questionIndex].options[optionIndex].answers.push(answer);

    return this.questions[questionIndex];
  }

  public async createOption(text: string, id: number): Promise<Option> {
    const option = new Option();

    Object.assign(option, { text, id });

    return option;
  }
}

export default FakeQuestionsRepository;
