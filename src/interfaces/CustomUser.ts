export interface ICustomUser {
    id?: number;
    username: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dateJoined?: Date;
    lastLogin?: Date;
    isActive?: boolean;
    isStaff?: boolean;
    isSuperuser?: boolean;
}