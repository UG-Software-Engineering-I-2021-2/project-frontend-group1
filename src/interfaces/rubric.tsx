export interface RubricResponse {
    data: Array<Rubric>
}



export interface Rubric {
    code: string,
    title: string,
    state: string,
    evaluation: string,
    competenceCode: string,
    date: string,
    week: string,
    evidence: string,
    criteriaCode: string,
    activity: string,
    canEdit: boolean,
    students: string,
    level: string
}


export interface CreateRubricResponse {
    data: Array<CreateRubricInterface>
}
export interface CreateRubricInterface {
    title: string,
    activity: string,
    competence: string,
    course: string,
    state: string,
    criteria: string,
    criteriaLevel: number,
    cycles: string,
    date: string,
    content: string,
    evaluation: string,
    evidence: string,
    week: string,
    codCompetence: string    
}

export interface ImportRubricContent {
    content: string,
    filter: string
}
export interface ImportRubric {
    data: Array<ImportRubricContent>
}

export interface RubricContent {
    dimensiones: {
      value: string
    },
    excelente: {
      value: string,
      points:  number
    },
    bueno: {
      value: string,
      points:  number
    },
    endesarrollo: {
      value: string,
      points:  number
    },
    noaceptable: {
      value: string,
      points:  number
    },
  }


export const GetColorByRubricState = (state: string): string => {
    const selectedState = GetRubric(state)
    if (!selectedState) {
        return "#FFFFFF"
    }
    switch (selectedState) {
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
    const mapStateColor = new Map<string, string>()
    mapStateColor.set("Sin asignar", "Sin asignar")
    mapStateColor.set("Aprobacion pendiente", "Aprobacion pendiente")
    mapStateColor.set("Disponible para calificar", "Disponible para calificar")
    mapStateColor.set("Fuera de fecha", "Fuera de fecha")
    mapStateColor.set("Cumplidos", "Cumplidos")
    mapStateColor.set("", "")
    return mapStateColor.get(state)
}