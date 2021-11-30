export interface CoursesResponse {
    data: Array<CoursesDisplayed>
}



export interface CoursesDisplayed extends Courses {
    color: string,
    display?: boolean
  }


export interface Courses {
    name: string,
    code: string,
    careers: Array<string>,
    nState: {
        "Aprobacion pendiente": number
        "Cumplidos": number
        "Disponible para calificar": number
        "Fuera de fecha": number
        "Sin asignar": number
    }
}