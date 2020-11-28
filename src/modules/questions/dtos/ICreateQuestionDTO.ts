import Option from "../infra/typeorm/schemas/Options";

export default interface ICreateQuestionDTO {
  text: string;
  user_id: string;
  easy_id: string;
  options: Option[];
}
