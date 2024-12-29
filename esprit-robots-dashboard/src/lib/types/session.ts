import { Role } from "./user";

export interface Payload {
    user: UserPayload
    token: string;
    refreshToken: string;
    expiresIn: number;
}

export interface UserPayload {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    isActive: boolean;
}