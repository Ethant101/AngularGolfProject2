export interface Game {
    courseID: string,
    dateCreated: Date,
    difficulty: string,
    players: {
        name: string,
        handicap: boolean
        holes: number[]
    }[],
}
