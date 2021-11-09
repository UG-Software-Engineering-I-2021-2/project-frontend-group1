export interface RubricResponse {
    data:  Array<Rubric>
}



export interface Rubric {
    code: string, 
    state: string, 
    evaluation: string, 
    date: string, 
    week: string, 
    evidence: string, 
    activity: string,
    canEdit: string,
    students: string
}