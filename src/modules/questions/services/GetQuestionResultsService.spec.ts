import "reflect-metadata";

import CreateQuestionService from "./CreateQuestionService";
import AnswerQuestionService from "./AnswerQuestionService";
import GetQuestionResultsService from "./GetQuestionResultsService";

import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";
import FakeEasyCodeProvider from "../providers/EasyCodeProvider/fakes/FakeEasyCodeProvider";

import AppError from "../../../shared/errors/AppError";

describe("GetQuestionResults", () => {
  let fakeRepository: FakeQuestionRepository;
  let fakeEasyCodeProvider: FakeEasyCodeProvider;
  let createQuestionService: CreateQuestionService;
  let answerQuestionService: AnswerQuestionService;
  let getQuestionResultsService: GetQuestionResultsService;

  beforeEach(() => {
    fakeRepository = new FakeQuestionRepository();
    fakeEasyCodeProvider = new FakeEasyCodeProvider();

    createQuestionService = new CreateQuestionService(
      fakeRepository,
      fakeEasyCodeProvider
    );
    answerQuestionService = new AnswerQuestionService(fakeRepository);
    getQuestionResultsService = new GetQuestionResultsService(fakeRepository);
  });

  it("should be able to get a question results", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    await answerQuestionService.execute({
      user_id: "big",
      question_id: question.easy_id,
      option_id: 4,
    });

    const results = await getQuestionResultsService.execute({
      easy_id: question.easy_id,
    });

    expect(results).toHaveProperty("results");
  });

  it("should be able to count results", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    await answerQuestionService.execute({
      user_id: "big1",
      question_id: question.easy_id,
      option_id: 2,
    });

    await answerQuestionService.execute({
      user_id: "big2",
      question_id: question.easy_id,
      option_id: 2,
    });

    await answerQuestionService.execute({
      user_id: "big3",
      question_id: question.easy_id,
      option_id: 4,
    });

    await answerQuestionService.execute({
      user_id: "big4",
      question_id: question.easy_id,
      option_id: 4,
    });

    const results = await getQuestionResultsService.execute({
      easy_id: question.easy_id,
    });

    expect(results).toHaveProperty("results");
    expect(results.results[2]).toBe(2);
    expect(results.results[4]).toBe(2);
  });

  it("should not be able to get an invalid question results", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    await expect(
      getQuestionResultsService.execute({
        easy_id: "invalid easy id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
