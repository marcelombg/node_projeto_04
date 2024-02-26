import { QuestionComment } from '../../enterprise/entitites/question-comment';
import { QuestionCommentsRespository } from '../repositories/question-comments-respository';

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string
    page: number
}

interface FetchQuestionCommentsUseCaseRequestResponse {
    questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentsRepository: QuestionCommentsRespository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseRequestResponse> {
        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, {page})

        return {
            questionComments
        }
    }
}
