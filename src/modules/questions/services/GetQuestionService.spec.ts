import "reflect-metadata";

import CreateQuestionService from "./CreateQuestionService";
import AnswerQuestionService from "./AnswerQuestionService";
import GetQuestionResultsService from "./GetQuestionResultsService";
import GetQuestionService from "./GetQuestionService";

import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";
import FakeEasyCodeProvider from "../providers/EasyCodeProvider/fakes/FakeEasyCodeProvider";
import AppError from "../../../shared/errors/AppError";

describe("GetQuestionResults", () => {
  let fakeRepository: FakeQuestionRepository;
  let fakeEasyCodeProvider: FakeEasyCodeProvider;
  let createQuestionService: CreateQuestionService;
  let answerQuestionService: AnswerQuestionService;
  let getQuestionResultsService: GetQuestionResultsService;
  let getQuestionService: GetQuestionService;

  beforeEach(() => {
    fakeRepository = new FakeQuestionRepository();
    fakeEasyCodeProvider = new FakeEasyCodeProvider();

    createQuestionService = new CreateQuestionService(
      fakeRepository,
      fakeEasyCodeProvider
    );
    answerQuestionService = new AnswerQuestionService(fakeRepository);
    getQuestionResultsService = new GetQuestionResultsService(fakeRepository);

    getQuestionService = new GetQuestionService(fakeRepository);
  });

  it("should be able to get a question contents", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    const foundQuestion = await getQuestionService.execute({
      easy_id: question.easy_id,
    });

    expect(foundQuestion).toHaveProperty("easy_id");
    expect(foundQuestion.options.length).toBe(5);
  });

  it("should be able get option answers", async () => {
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

    const foundQuestion = await getQuestionService.execute({
      easy_id: question.easy_id,
    });

    expect(foundQuestion.options[1]).toHaveProperty("answers");
    expect(foundQuestion.options[3]).toHaveProperty("answers");
  });

  it("should not be able to get an invalid question", async () => {
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
      getQuestionService.execute({
        easy_id: "invalid easy id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
