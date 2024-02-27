import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Question', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  test('it should be ableo to create a question', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da reposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
