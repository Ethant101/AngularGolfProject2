export interface Game {
    courseID: string,
    name: string,
    dateCreated: string,
    cardID: string,
    difficulty: string,
    players: {
        name: string,
        handicap: boolean
        holes: number[]
    }[],
}
