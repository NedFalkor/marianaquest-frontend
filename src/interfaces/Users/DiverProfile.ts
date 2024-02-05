export interface IPersonalInfo {
    last_name: string;
    first_name: string;
    address: string;
    postal_code: string;
    city: string;
    country: string;
    landline?: string | null;
    mobile?: string | null;
    email: string;
    imageURL?: string | null;
    identity_photo?: File;
}

export interface IEmergencyContact {
    last_name: string;
    first_name: string;
    address: string;
    landline?: string | null;
    mobile?: string | null;
    email: string;
}

export interface IDiverProfile {
    id?: number;
    userId?: number;
    // logbookNumber: string;
    // cumulativeDivesInLogbook: number;
    // totalDives: number;
    identityPhoto?: string | null;
    personalInfo: IPersonalInfo;
    emergencyContact: IEmergencyContact;
}