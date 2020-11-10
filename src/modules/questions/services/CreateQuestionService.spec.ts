import "reflect-metadata";
import CreateQuestionService from "./CreateQuestionService";
import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";

describe("CreateQuestion", () => {
  it("should be able to create a new question", async () => {
    const fakeRepository = new FakeQuestionRepository();
    const createQuestionService = new CreateQuestionService(fakeRepository);

    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    expect(question).toHaveProperty("easy_id");
    expect(question.options.length).toBe(5);
  });
});
