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
    const selectedState = GetRubric(state)
    if(!selectedState) {
        return "#FFFFFF"
    }
    switch(selectedState) { 
        case "Sin asignar": { 
            return "#FF8F7D"
        } 
        case "Aprobacion pendiente": { 
            return "#F5B045"
        } 
        case "Disponible para calificar": { 
            return "#344B70"
        } 
        case "Fuera de fecha": { 
            return "#F75432"
        } 
        case "Cumplidos": { 
            return "#20BA53"
        } 
        default: { 
            return "#FFFFFF"
        } 
     } 
}


export const GetRubric = (state: string) => {
    const mapStateColor = new Map<string,string>()
    mapStateColor.set("Sin asignar", "Sin asignar")
    mapStateColor.set("Aprobacion pendiente", "Aprobacion pendiente")
    mapStateColor.set("Disponible para calificar", "Disponible para calificar")
    mapStateColor.set("Fuera de fecha", "Fuera de fecha")
    mapStateColor.set("Cumplidos", "Cumplidos")

    return mapStateColor.get(state)
}