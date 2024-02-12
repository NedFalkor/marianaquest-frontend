export interface IDiveGroup {
    id?: number;
    groupDescription: string;
    boatDriver: number | null; // Permettre null
    trainerOne: number | null; // Permettre null
    trainerTwo: number | null; // Permettre null
    divers: number[];
    createdOn?: Date;
}