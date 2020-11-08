import ICreateQuestionDTO from "../dtos/ICreateQuestionDTO";
import Question from "../infra/typeorm/schemas/Question";

export default interface IQuestionsRepository {
  create(data: ICreateQuestionDTO): Promise<Question>;
}
