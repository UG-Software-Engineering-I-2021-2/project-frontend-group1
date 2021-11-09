export interface RubricResponse {
    data:  Array<Rubric>
}



export interface Rubric {
    actividad: string,
    codRubrica: string,
    estado: string,
    evaluacion: string,
    evidencia: string,
    fecha: string,
    semana: string
}