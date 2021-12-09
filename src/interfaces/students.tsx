


export interface Student {
    studentCode: string,
    studentName: string,
}


export interface StudentResponse {
    data: Array<Student>,
}


export interface StudentContent {
    student: { code: string, finished: string },
    competenceGrade: Array<{ key: string }>,
    studentGrade: Array<{ key: string }>,
}

export interface CompetenceRubric {
    competenceLeft: number,
    competenceRight: number
}

export interface StudentGrade {
    bueno: number,
    excelente: number,
    endesarrollo: number,
    total: number,
    noaceptable: number,
    content: string,
}

export interface StudentsGradeResponse {
    data: StudentsGrade,
}
export interface StudentsGrade {
    studentGrade:  string,
    competenceGrade: string,
    finished: boolean,
    studentCode: string
}