import { UniqueEntityID } from '@/domain/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entitites/answer-comment';
import { AnswerRespository } from '../repositories/answers-repository';
import { AnswerCommentsRespository } from '../repositories/answer-comments-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './erros/resource-not-found-error';

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseRequestResponse = Either<ResourceNotFoundError, {answerComment: AnswerComment}>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswerRespository,
    private answerCommentsRepository: AnswerCommentsRespository
  ) { }

  async execute({
    authorId,
    answerId,
    content
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseRequestResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment
    })
  }
}
