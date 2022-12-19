import questionJson from "data/questions.json";

import { Question } from "types/Question";

export function getQuestion(id: string) {
    const questions = JSON.parse(JSON.stringify(questionJson)) as Question[];

    const question = questions.find(q => q.id === id);

    return question;
}