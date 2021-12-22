export interface Careers {
    id: number,
    name: string
}

export interface StatisticsCareers {
    data: Array<Careers>
}

export interface Stats {
    criteria: string,
    score: Map<number, string>
}
export interface Statistics1 {
    data: Array<Stats>
}