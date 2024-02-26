import { Answer } from '../../enterprise/entitites/answer';
import { AnswerRespository } from '../repositories/answers-repository';

interface FetchQuestionAnswersUseCaseRequest {
    questionId: string
    page: number
}

interface FetchQuestionAnswersUseCaseRequestResponse {
    answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswerRespository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseRequestResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(questionId, {page})

        return {
            answers
        }
    }
}
