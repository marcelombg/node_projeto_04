import { Answer } from "../entitites/answer";

export interface AnswerRespository {
    create(answer: Answer) : Promise<void>
}