export interface Hole {
    hole: number;
    teeBoxes: {
        teeType: string;
        par: number;
        yards: number;
        hcp: number;
    }[];
}
