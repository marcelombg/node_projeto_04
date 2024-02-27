import { Either, left, right } from '@/core/either';
import { AnswerRespository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { NotAllowedError } from './erros/not-allowed-error';

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseRequestResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswerRespository) {}

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest) : Promise<DeleteAnswerUseCaseRequestResponse> {
    const question = await this.questionsRepository.findById(answerId)
    
    if(!question){
      return left(new ResourceNotFoundError())
    }

    if(authorId != question.authorId.toString()){
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
