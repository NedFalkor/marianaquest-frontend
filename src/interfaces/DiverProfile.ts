export interface IDiverProfile {
    id?: number;
    userId: number;

    logbookNumber: string;
    cumulativeDivesInLogbook: number;
    totalDives: number;
    identityPhoto?: string | null;

    lastName: string;
    firstName: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;

    landline?: string | null;
    mobile?: string | null;
    email: string;

    emergencyContactLastName: string;
    emergencyContactFirstName: string;
    emergencyContactAddress: string;
    emergencyContactLandline?: string | null;
    emergencyContactMobile?: string | null;
    emergencyContactEmail: string;
}
