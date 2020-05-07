export interface Game {
    courseID: string,
    dateCreated: Date,
    cardID: string,
    difficulty: string,
    players: {
        name: string,
        handicap: boolean
        holes: number[]
    }[],
}
