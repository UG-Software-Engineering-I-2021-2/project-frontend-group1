export interface RubricResponse {
    data: Array<Rubric>
}



export interface Rubric {
    code: string,
    state: string,
    evaluation: string,
    date: string,
    week: string,
    evidence: string,
    activity: string,
    canEdit: boolean,
    students: string
}


export const GetColorByRubricState = (state: string): string => {
    const mapStateColor = new Map<string,string>()
    mapStateColor.set("Sin asignar", "#FF8F7D")
    mapStateColor.set("Aprobacion pendiente", "#F5B045")
    mapStateColor.set("Disponible para calificar", "#344B70")
    mapStateColor.set("Fuera de fecha", "#F75432")
    mapStateColor.set("Cumplidos", "#20BA53")

    return mapStateColor.get(state) || "#FFFFFF"
}