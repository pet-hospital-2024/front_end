export interface ChoiceQuestion {
    disease_kind: string
    type: 'choice'
    question_body: string
    A: string
    B: string
    C: string
    D: string
    right_choice: string
    value:string
  }
export  interface JudgementQuestion {
    disease_kind: string
    type: 'judgement'
    question_body: string
    judgement: string
    value:string
  }
export type Question = ChoiceQuestion | JudgementQuestion;
export interface QuestionID{
    question_id:string
}
export interface AddQuestion{
    authorization_header:string
}
export interface responseQuestionData{
    question:Question;
    
}