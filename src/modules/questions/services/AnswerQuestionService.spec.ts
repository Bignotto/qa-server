import "reflect-metadata";
import CreateQuestionService from "./CreateQuestionService";
import AnswerQuestionService from "./AnswerQuestionService";
import FakeQuestionRepository from "../repositories/fakes/FakeQuestionsRepository";
import FakeEasyCodeProvider from "../providers/EasyCodeProvider/fakes/FakeEasyCodeProvider";

describe("AnswerQuestion", () => {
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

    const answeredQuestion = await answerQuestionService.execute({
      user_id: "big",
      question_id: question.easy_id,
      option_id: 4,
    });

    expect(answeredQuestion.options[3]).toHaveProperty("answers");
  });

  it("a question can get multiple answers", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    const answeredQuestion = await answerQuestionService.execute({
      user_id: "big",
      question_id: question.easy_id,
      option_id: 4,
    });

    expect(answeredQuestion.options[3]).toHaveProperty("answers");

    const answeredQuestion2 = await answerQuestionService.execute({
      user_id: "bigbig",
      question_id: question.easy_id,
      option_id: 3,
    });

    expect(answeredQuestion2.options[2]).toHaveProperty("answers");

    const answeredQuestion3 = await answerQuestionService.execute({
      user_id: "bigbigbig",
      question_id: question.easy_id,
      option_id: 3,
    });

    expect(answeredQuestion3.options[2].answers.length).toBeGreaterThan(1);
  });

  it("should not be able to answer an invalid question id", async () => {
    await expect(
      answerQuestionService.execute({
        user_id: "dunha",
        question_id: "xxxxx",
        option_id: 4,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to answer an expired question", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 10, 28, 17, 30).getTime();
    });

    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 10, 28, 18).getTime();
    });

    await expect(
      answerQuestionService.execute({
        user_id: "dunha",
        question_id: question.easy_id,
        option_id: 4,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("a user should not be able to answer an question twice", async () => {
    const question = await createQuestionService.execute({
      user_id: "dunha",
      text: "esta é uma pergunta teste",
      option_1: "primeira",
      option_2: "segunda",
      option_3: "terceira",
      option_4: "quarta",
      option_5: "quinta",
    });

    const answeredQuestion = await answerQuestionService.execute({
      user_id: "big",
      question_id: question.easy_id,
      option_id: 4,
    });

    expect(answeredQuestion.options[3]).toHaveProperty("answers");

    await expect(
      answerQuestionService.execute({
        user_id: "big",
        question_id: question.easy_id,
        option_id: 4,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("the user who created the question cannot answer it", async () => {
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
      answerQuestionService.execute({
        user_id: "dunha",
        question_id: question.easy_id,
        option_id: 4,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
