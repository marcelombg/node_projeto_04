import { AnswerRespository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseRequestResponse {}

export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswerRespository) {}

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest) : Promise<DeleteAnswerUseCaseRequestResponse> {
    const question = await this.questionsRepository.findById(answerId)
    
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
