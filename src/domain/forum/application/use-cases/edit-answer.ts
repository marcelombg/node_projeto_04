import { Answer } from '../../enterprise/entitites/answer';
import { AnswerRespository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseRequestResponse {
    answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRespository) {}

  async execute({
    authorId,
    answerId,
    content
  }: EditAnswerUseCaseRequest) : Promise<EditAnswerUseCaseRequestResponse> {
    const answer = await this.answersRepository.findById(answerId)
    
    if(!answer){
        throw new Error('Answer not found.')
    }

    if(authorId != answer.authorId.toString()){
        throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {
        answer
    }
  }
}