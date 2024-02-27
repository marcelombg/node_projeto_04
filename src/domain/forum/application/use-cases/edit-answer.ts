import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entitites/answer';
import { AnswerRespository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { NotAllowedError } from './erros/not-allowed-error';

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseRequestResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer: Answer
}>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRespository) {}

  async execute({
    authorId,
    answerId,
    content
  }: EditAnswerUseCaseRequest) : Promise<EditAnswerUseCaseRequestResponse> {
    const answer = await this.answersRepository.findById(answerId)
    
    if(!answer){
      return left(new ResourceNotFoundError())
    }

    if(authorId != answer.authorId.toString()){
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer
  })
  }
}