export interface Node {
    from_tiploc: string,
    to_tiploc: string,
    distance: number
}

export interface Path {
    path: string[],
    cost: number
}