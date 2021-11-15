export interface CoursesResponse {
    data: Array<Courses>
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