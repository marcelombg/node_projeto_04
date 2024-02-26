import { Question } from '../../enterprise/entitites/question';
import { QuestionsRespository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseRequestResponse {
  question: Question
}

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
        throw new Error('Question not found.')
    }

    if(authorId != question.authorId.toString()){
        throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {
      question
    }
  }
}