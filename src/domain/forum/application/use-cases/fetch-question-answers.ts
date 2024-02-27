import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entitites/answer';
import { AnswerRespository } from '../repositories/answers-repository';

interface FetchQuestionAnswersUseCaseRequest {
    questionId: string
    page: number
}

type FetchQuestionAnswersUseCaseRequestResponse = Either<null, {
    answers: Answer[]
}>

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswerRespository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseRequestResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(questionId, {page})

        return right({
            answers
        })
    }
}
