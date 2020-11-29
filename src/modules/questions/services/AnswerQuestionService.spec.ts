import "reflect-metadata";
import CreateQuestionService from "./CreateQuestionService";
import AnswerQuestionService from "./AnswerQuestionService";
import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";
import FakeEasyCodeProvider from "../providers/EasyCodeProvider/fakes/FakeEasyCodeProvider";

describe("CreateQuestion", () => {
  let fakeRepository: FakeQuestionRepository;
  let fakeEasyCodeProvider: FakeEasyCodeProvider;
  let createQuestionService: CreateQuestionService;
  let answerQuestionService: AnswerQuestionService;

  beforeEach(() => {
    fakeRepository = new FakeQuestionRepository();
    fakeEasyCodeProvider = new FakeEasyCodeProvider();
    createQuestionService = new CreateQuestionService(
      fakeRepository,
      fakeEasyCodeProvider
    );
    answerQuestionService = new AnswerQuestionService(fakeRepository);
  });

  it("should be able to answer a question", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    // expect(question).toHaveProperty("easy_id");
    // expect(question.options.length).toBe(5);

    const answeredQuestion = await answerQuestionService.execute({
      user_id: "big",
      question_id: question.easy_id,
      option_id: 4,
    });

    expect(answeredQuestion.options[3]).toHaveProperty("answer");
  });

  //   it("should not be able to use same easy code twice", async () => {
  //     jest
  //       .spyOn(fakeEasyCodeProvider, "generateCode")
  //       .mockImplementation(() => "00000");

  //     await createQuestionService.execute({
  //       user_id: "dunha",
  //       text: "esta é uma pergunta teste",
  //       option_1: "primeira",
  //       option_2: "segunda",
  //       option_3: "terceira",
  //       option_4: "quarta",
  //       option_5: "quinta",
  //     });

  //     await expect(
  //       createQuestionService.execute({
  //         user_id: "dunha",
  //         text: "esta é uma pergunta teste",
  //         option_1: "primeira",
  //         option_2: "segunda",
  //         option_3: "terceira",
  //         option_4: "quarta",
  //         option_5: "quinta",
  //       })
  //     ).rejects.toBeInstanceOf(Error);
  //   });

  //   it("should not be able to create a question with only one option", async () => {
  //     await expect(
  //       createQuestionService.execute({
  //         user_id: "dunha",
  //         text: "esta é uma pergunta teste",
  //         option_1: "primeira",
  //       })
  //     ).rejects.toBeInstanceOf(Error);
  //   });

  //   it("should not be able to create a question without user_id", async () => {
  //     await expect(
  //       createQuestionService.execute({
  //         text: "esta é uma pergunta teste",
  //         option_1: "primeira",
  //         option_2: "segunda",
  //         option_3: "terceira",
  //         option_4: "quarta",
  //         option_5: "quinta",
  //       })
  //     ).rejects.toBeInstanceOf(Error);
  //   });

  //   it("should not be able to create a question without text", async () => {
  //     await expect(
  //       createQuestionService.execute({
  //         user_id: "dunha",
  //         option_1: "primeira",
  //         option_2: "segunda",
  //         option_3: "terceira",
  //         option_4: "quarta",
  //         option_5: "quinta",
  //       })
  //     ).rejects.toBeInstanceOf(Error);
  //   });
});
