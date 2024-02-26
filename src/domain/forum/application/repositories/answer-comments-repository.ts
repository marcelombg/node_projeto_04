import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entitites/answer-comment";

export interface AnswerCommentsRespository {
  findById(id: String): Promise<AnswerComment | null>
  findManyByAnswerId(answerId: String, params: PaginationParams): Promise<AnswerComment[]>
  delete(answerComment: AnswerComment): Promise<void>
  create(answerComment: AnswerComment): Promise<void>
}