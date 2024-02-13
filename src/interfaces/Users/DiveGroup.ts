export interface IDiveGroup {
    id?: number;
    groupDescription: string;
    boatDriver: number | null;
    trainerOne: number | null;
    trainerTwo: number | null;
    divers: number[];
    createdOn?: Date;
}