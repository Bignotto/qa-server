import "reflect-metadata";

import CreateQuestionService from "./CreateQuestionService";
import AnswerQuestionService from "./AnswerQuestionService";
import GetQuestionResultsService from "./GetQuestionResultsService";

import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";
import FakeEasyCodeProvider from "../providers/EasyCodeProvider/fakes/FakeEasyCodeProvider";

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
});
