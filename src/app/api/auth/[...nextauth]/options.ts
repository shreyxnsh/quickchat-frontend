import { Account, AuthOptions, ISODateString, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import { LOGIN_URL } from '@/lib/apiEndpoint';


export interface CustomSession {
    user?: CustomUser;
    expires: ISODateString;
  }
  export interface CustomUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
  }

export const authOptions: AuthOptions = {
    pages : {
        signIn: '/',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: null
    },
    callbacks: {

        async signIn({
            user,
            account,
          } : {user: CustomUser , account: Account|null}) {

            try {

              console.log("User data is ",user);
            console.log("Account data is ",account);

            // send this payload to the backend api to store it in the postgres table
            const payload = {
              email : user.email,
              name : user.name,
              image : user?.image,
              oauth_id: account?.providerAccountId,
              provider : account?.provider,
            }

            const {data} = await axios.post(LOGIN_URL,payload);

            user.id = data?.user?.id.toString();
            user.token = data?.user?.token;
            user.provider = data?.user?.provider;



            
            return true;
            } catch (error) {
              return false;
            }

            
          },
       
    async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
  
      async session({
        session,
        token,
        user,
      }: {
        session: CustomSession;
        token: JWT;
        user: User;
      }) {
        session.user = token.user as CustomUser;
        return session;
      },
      },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },
        }),
      ],
}


