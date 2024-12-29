import { UserPayload } from '@/lib/types/session';
import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: UserPayload
        token: string;
        refreshToken: string;
        expiresIn: number;
    }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        user: UserPayload
        token: string;
        refreshToken: string;
        expiresIn: number;
    }
}

