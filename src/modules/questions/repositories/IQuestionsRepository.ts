import ICreateQuestionDTO from "../dtos/ICreateQuestionDTO";
import Option from "../infra/typeorm/schemas/Options";
import Question from "../infra/typeorm/schemas/Question";

export default interface IQuestionsRepository {
  create(data: ICreateQuestionDTO): Promise<Question>;

  answer(
    question_id: string,
    option_id: number,
    user_id: string
  ): Promise<Question>;

  createOption(text: string, id: number): Promise<Option>;
  findByEasyCode(easy_id: string): Promise<Question | undefined>;
}
