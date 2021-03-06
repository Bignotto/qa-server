import "reflect-metadata";
import CreateQuestionService from "./CreateQuestionService";
import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";
import FakeEasyCodeProvider from "../providers/EasyCodeProvider/fakes/FakeEasyCodeProvider";

import AppError from "../../../shared/errors/AppError";

describe("CreateQuestion", () => {
  let fakeRepository: FakeQuestionRepository;
  let fakeEasyCodeProvider: FakeEasyCodeProvider;
  let createQuestionService: CreateQuestionService;

  beforeEach(() => {
    fakeRepository = new FakeQuestionRepository();
    fakeEasyCodeProvider = new FakeEasyCodeProvider();
    createQuestionService = new CreateQuestionService(
      fakeRepository,
      fakeEasyCodeProvider
    );
  });

  it("should be able to create a new question", async () => {
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

  it("should not be able to use same easy code twice", async () => {
    jest
      .spyOn(fakeEasyCodeProvider, "generateCode")
      .mockImplementation(() => "00000");

    await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    await expect(
      createQuestionService.execute({
        user_id: "dunha",
        text: "esta é uma pergunta teste",
        option_1: "primeira",
        option_2: "segunda",
        option_3: "terceira",
        option_4: "quarta",
        option_5: "quinta",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a question with only one option", async () => {
    await expect(
      createQuestionService.execute({
        user_id: "dunha",
        text: "esta é uma pergunta teste",
        option_1: "primeira",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a question without user_id", async () => {
    await expect(
      createQuestionService.execute({
        text: "esta é uma pergunta teste",
        option_1: "primeira",
        option_2: "segunda",
        option_3: "terceira",
        option_4: "quarta",
        option_5: "quinta",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a question without text", async () => {
    await expect(
      createQuestionService.execute({
        user_id: "dunha",
        option_1: "primeira",
        option_2: "segunda",
        option_3: "terceira",
        option_4: "quarta",
        option_5: "quinta",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
