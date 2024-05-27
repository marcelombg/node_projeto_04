import { Either, left, right } from "@/core/either"
import { AnswerCommentsRespository } from "../repositories/answer-comments-repository"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseRequestResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRespository
    ) {}

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest) : Promise<DeleteAnswerCommentUseCaseRequestResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if(!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if(answerComment.authorId.toString() != authorId){
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
