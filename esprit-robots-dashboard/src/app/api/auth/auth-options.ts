import { refreshToken, signIn } from '@/actions/auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                
                const { email, password } = credentials;
                const { error, data } = await signIn(email, password);

                console.log(error);
                

                if (error) {
                    throw new Error(error);
                }
                
                if (!data) {
                    throw new Error("Invalid credentials");
                }

                return data as any;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            try {
                if (user) return { ...token, ...user };

                if (trigger === 'update' && session) {
                    token = {
                        ...token,
                        ...session
                    };
                    return token;
                }

                if (new Date().getTime() < token.expiresIn) return token;
                const { error, data } = await refreshToken(token.refreshToken);

                if (error) {
                    throw new Error(error);
                }

                return {
                    ...token,
                    ...data
                };
            } catch (err) {
                console.error('JWT callback error:', err);
                return token;
            }
        },

        async session({ token, session }) {
            return {
                ...session,
                ...token
            };
        }
    },
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    }
};
