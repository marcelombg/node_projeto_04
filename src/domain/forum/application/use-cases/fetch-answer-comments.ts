import { AnswerComment } from '../../enterprise/entitites/answer-comment';
import { AnswerCommentsRespository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentsUseCaseRequest {
    answerId: string
    page: number
}

interface FetchAnswerCommentsUseCaseRequestResponse {
    answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRespository) { }

    async execute({
        answerId,
        page
    }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseRequestResponse> {
        const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, {page})

        return {
            answerComments
        }
    }
}
