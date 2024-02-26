import { QuestionCommentsRespository } from '../repositories/question-comments-respository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseRequestResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRespository
    ) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest) : Promise<DeleteQuestionCommentUseCaseRequestResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId)

    if(!questionComment) {
        throw new Error('Question comment not found.')
    }

    if(questionComment.authorId.toString() != authorId){
        throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
