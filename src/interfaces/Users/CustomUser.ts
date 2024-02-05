import { IDiverProfile, IEmergencyContact, IPersonalInfo } from "./DiverProfile";

export interface ICustomUser {
    id?: number;
    email: string;
    username: string;
    password?: string;
    role: string;
    dateJoined?: Date;
    lastLogin?: Date;
    isActive?: boolean;
    isStaff?: boolean;
    isSuperuser?: boolean;
    diverProfile?: IDiverProfile;
    personalInformation?: IPersonalInfo;
    emergencyContact?: IEmergencyContact
  }  