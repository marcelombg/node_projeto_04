import { UniqueEntityID } from '@/domain/entities/unique-entity-id'
import { Answer } from '../../enterprise/entitites/answer'
import { AnswerRespository } from '../repositories/answers-repository'
import { Either, right } from '@/core/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, {answer: Answer}>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswerRespository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) : Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return right({ 
      answer
    })
  }
}
