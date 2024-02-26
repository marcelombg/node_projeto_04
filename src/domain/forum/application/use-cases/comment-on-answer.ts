import { UniqueEntityID } from '@/domain/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entitites/answer-comment';
import { AnswerRespository } from '../repositories/answers-repository';
import { AnswerCommentsRespository } from '../repositories/answer-comments-repository';

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseRequestResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswerRespository,
    private answerCommentsRepository: AnswerCommentsRespository
    ) {}

  async execute({
    authorId,
    answerId,
    content
  }: CommentOnAnswerUseCaseRequest) : Promise<CommentOnAnswerUseCaseRequestResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
        throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
        authorId: new UniqueEntityID(authorId),
        answerId: new UniqueEntityID(answerId),
        content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return {
        answerComment
    }
  }
}
