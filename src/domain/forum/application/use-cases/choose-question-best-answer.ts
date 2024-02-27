import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entitites/question'
import { AnswerRespository } from '../repositories/answers-repository'
import { QuestionsRespository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { NotAllowedError } from './erros/not-allowed-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRespository,
    private answersRepository: AnswerRespository
  ) { }

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({
      question
    })
  }
}
