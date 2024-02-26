import { makeAnswer } from 'test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/domain/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new ChooseQuestionBestAnswerUseCase(
            inMemoryQuestionsRepository,
            inMemoryAnswersRepository)
    })

    test('it should be able to choose the question best answer', async () => {

        const question = makeQuestion()

        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString()
        })

        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
    })

    test('it should not be able to choose another user question best answer', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        })

        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)     

        expect(() => {
            return sut.execute({
                answerId: answer.id.toString(),
                authorId: 'author-2'
            })
        }).rejects.toBeInstanceOf(Error)
    })
})