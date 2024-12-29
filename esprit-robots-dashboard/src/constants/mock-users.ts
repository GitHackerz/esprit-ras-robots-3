import { Role, User } from "@/lib/types/user";

export const mockUsers: User[] = [
    {
        _id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "hashedpassword1",
        phone: "+1234567890",
        role: Role.ADMIN,
        isVerified: true,
        isActive: true,
    },
    {
        _id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashedpassword2",
        phone: "+1234567891",
        role: Role.USER,
        isVerified: true,
        isActive: false,
    },
    {
        _id: "3",
        name: "Bob Wilson",
        email: "bob@example.com",
        password: "hashedpassword3",
        phone: "+1234567892",
        role: Role.USER,
        isVerified: false,
        isActive: true,
    }
];
