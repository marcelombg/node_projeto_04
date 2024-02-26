import { UniqueEntityID } from '@/domain/entities/unique-entity-id'
import { QuestionComment, QuestionCommentProps } from '@/domain/forum/enterprise/entitites/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID
) {
  const questionComment = QuestionComment.create({
    authorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  },
    id)

  return questionComment
}