import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entitites/question';
import { QuestionsRespository } from '../repositories/questions-repository';

interface FetchRecentQuestionsUseCaseRequest {
    page: number
}

type FetchRecentQuestionsUseCaseRequestResponse = Either<null, {
    questions: Question[]
}>

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRespository) { }

    async execute({
        page
    }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseRequestResponse> {
        const questions = await this.questionsRepository.findManyRecent({page})

        return right({
            questions
        })
    }
}
