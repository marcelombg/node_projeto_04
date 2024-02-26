import { UniqueEntityID } from '@/domain/entities/unique-entity-id'
import { AnswerComment, AnswerCommentProps } from '@/domain/forum/enterprise/entitites/answer-comment'
import { QuestionComment, QuestionCommentProps } from '@/domain/forum/enterprise/entitites/question-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID
) {
  const answerComment = AnswerComment.create({
    authorId: new UniqueEntityID(),
    answerId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  },
    id)

  return answerComment
}