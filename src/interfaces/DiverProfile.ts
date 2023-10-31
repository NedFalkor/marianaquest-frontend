export interface IPersonalInfo {
    lastName: string;
    firstName: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    landline?: string | null;
    mobile?: string | null;
    email: string;
    imageURL?: string | null;
    selectedImage?: File | null;
}

export interface IEmergencyContact {
    emergencyContactLastName: string;
    emergencyContactFirstName: string;
    emergencyContactAddress: string;
    emergencyContactLandline?: string | null;
    emergencyContactMobile?: string | null;
    emergencyContactEmail: string;
}

export interface IDiverProfile {
    id?: number;
    userId: number;
    logbookNumber: string;
    cumulativeDivesInLogbook: number;
    totalDives: number;
    identityPhoto?: string | null;
    personalInfo: IPersonalInfo;
    emergencyContact: IEmergencyContact;
}