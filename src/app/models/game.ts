export interface Game {
    courseID: string,
    name: string,
    dateCreated: Date,
    cardID: string,
    difficulty: string,
    players: {
        name: string,
        handicap: boolean
        holes: number[]
    }[],
}
