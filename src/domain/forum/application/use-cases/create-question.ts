import { UniqueEntityID } from '@/domain/entities/unique-entity-id';
import { Question } from '../../enterprise/entitites/question';
import { QuestionsRespository } from '../repositories/questions-repository';

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseRequestResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRespository) {}

  async execute({
    authorId,
    title,
    content
  }: CreateQuestionUseCaseRequest) : Promise<CreateQuestionUseCaseRequestResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionsRepository.create(question)

    return {
      question
    }
  }
}
