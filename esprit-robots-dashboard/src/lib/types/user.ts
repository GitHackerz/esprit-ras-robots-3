export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    otpCode?: string;
    codeExpires?: Date;
    isVerified: boolean;
    isActive: boolean;
}

// Type for creating a new user
export type CreateUserInput = Omit<User, 'id'>;

// Type for updating a user
export type UpdateUserInput = Partial<CreateUserInput>;

// Type for user response (without sensitive data)
export type UserResponse = Omit<User, 'password' | 'otpCode' | 'codeExpires'>;
