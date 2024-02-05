export interface ICustomJwtPayload {
    exp?: number; // Standard JWT expiration field
    role?: string; // Custom field for user's role
    username?: string; // Username for the user
    user_id?: number; // A unique identifier for the user
    // Include any other fields that you put into your JWT tokens.
  }
  