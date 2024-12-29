'use server';

import { Payload } from '@/lib/types/session';
import axios from 'axios';

export async function signIn(
    email: string,
    password: string
): Promise<{
    data?: Payload;
    error?: string;
}> {
    try {
        const { data } = await axios.post(
            `${process.env.SERVER_URL}/auth/sign-in`,
            {
                email,
                password
            }
        );

        return { data };
    } catch (error: any) {
        console.log(error.response?.data);
        
        return { error: error.response?.data?.message || "Error signing in" };
    }
}

export async function signInWithGoogle(email: string): Promise<{
    data?: Payload;
    error?: string;
}> {
    try {
        const { data } = await axios.post(
            `${process.env.SERVER_URL}/auth/sign-in-google`,
            {
                email
            }
        );

        return { data };
    } catch (error: any) {
        return {
            error: error.response?.data?.message || "Error signing in with Google"
        };
    }
}

export async function refreshToken(token: string): Promise<{
    data?: Payload;
    error?: string;
}> {
    try {
        const { data } = await axios.post(
            `${process.env.SERVER_URL}/user/refresh-token`,
            { token }
        );

        return { data };
    } catch (error: any) {
        return {
            error: error.response?.data?.message || "Error refreshing token"
        };
    }
}
