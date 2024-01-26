import { AnswerQuestionUseCase } from "./answer-question"
import { AnswerRespository } from "../repositories/answers-repository"
import { Answer } from "../entitites/answer"

const fakeAnswersRepository : AnswerRespository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '1',
        content: 'Nova resposta'
    })

    expect(answer.content).toEqual('Nova resposta')
})