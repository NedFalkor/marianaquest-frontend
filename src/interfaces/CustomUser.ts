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
  }  