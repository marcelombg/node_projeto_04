import { Question } from '../../enterprise/entitites/question';
import { QuestionsRespository } from '../repositories/questions-repository';

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

interface GetQuestionBySlugUseCaseRequestResponse {
    question: Question
}

export class GetQuestionBySlugUseCase {
    constructor(private questionsRepository: QuestionsRespository) { }

    async execute({
        slug
    }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseRequestResponse> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found.')

        }

        return {
            question
        }
    }
}
