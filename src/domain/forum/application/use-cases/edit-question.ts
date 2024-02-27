import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entitites/question';
import { QuestionsRespository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { NotAllowedError } from './erros/not-allowed-error';

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseRequestResponse = Either<ResourceNotFoundError | NotAllowedError, {
  question: Question
}>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRespository) {}

  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionUseCaseRequest) : Promise<EditQuestionUseCaseRequestResponse> {
    const question = await this.questionsRepository.findById(questionId)
    
    if(!question){
      return left(new ResourceNotFoundError())
    }

    if(authorId != question.authorId.toString()){
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({
      question
    })
  }
}