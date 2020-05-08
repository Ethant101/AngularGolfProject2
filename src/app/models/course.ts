import { Hole } from './hole';

export interface Course {
    id: string;
    holes: Hole[];
    thumbnail: string;
    difficulties: {
        teeType: string,
        teeHexColor: string,
        teeTypeId: number
    }[];
}
