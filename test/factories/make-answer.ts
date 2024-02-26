import { UniqueEntityID } from '@/domain/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entitites/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create({
    authorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  },
    id)

  return answer
}