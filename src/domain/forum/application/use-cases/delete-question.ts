import { QuestionsRespository } from '../repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseRequestResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRespository) {}

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest) : Promise<DeleteQuestionUseCaseRequestResponse> {
    const question = await this.questionsRepository.findById(questionId)
    
    if(!question){
        throw new Error('Question not found.')
    }

    if(authorId != question.authorId.toString()){
        throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
