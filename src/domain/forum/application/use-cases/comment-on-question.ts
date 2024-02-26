import { UniqueEntityID } from '@/domain/entities/unique-entity-id';
import { Question } from '../../enterprise/entitites/question';
import { QuestionsRespository } from '../repositories/questions-repository';
import { QuestionComment } from '../../enterprise/entitites/question-comment';
import { QuestionCommentsRespository } from '../repositories/question-comments-respository';

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseRequestResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRespository,
    private questionCommentsRepository: QuestionCommentsRespository
    ) {}

  async execute({
    authorId,
    questionId,
    content
  }: CommentOnQuestionUseCaseRequest) : Promise<CommentOnQuestionUseCaseRequestResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if(!question) {
        throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityID(authorId),
        questionId: new UniqueEntityID(questionId),
        content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
        questionComment
    }
  }
}
