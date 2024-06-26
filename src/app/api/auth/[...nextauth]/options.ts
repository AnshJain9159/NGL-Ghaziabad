// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// import bcrypt from "bcryptjs"
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/models/User";

// export const authOptions: NextAuthOptions = {
//     providers:[
//         CredentialsProvider({
//             id: 'credentials',
//             name: 'Credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text'},
//                 password: { label: 'Password', type: 'password' }
//               },
//               async authorize(credentials:any): Promise<any>{
//                     await dbConnect();
//                     try {
//                         const user = await UserModel.findOne({
//                             $or:[
//                                 {username:credentials.identifier},
//                                 {email:credentials.identifier},
//                             ],
//                         });
//                         if(!user){
//                             throw new Error('No user found with this email')
//                         }

//                         if(!user.isVerified){
//                             throw new Error("PLease verify your account before login")
//                         }
//                         const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)

//                         if(isPasswordCorrect){
//                             return user;
//                         }else{
//                             throw new Error("Incorrect Password");
//                         }
//                     } catch (error:any) {
//                         throw new Error(error);
//                     }
//               },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if(user){
//                 token._id=user._id?.toString();
//                 token.isVerified = user.isVerified;;
//                 token.isAcceptingMessage=user.isAcceptingMessage;
//                 token.username=user.username;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if(token){
//                 session.user._id=token._id;
//                 session.user.isVerified=token.isVerified;
//                 session.user.isAcceptingMessage=token.isAcceptingMessage;
//                 session.user.username=token.username;

//             }
//             return session;
//         },
        
//     },
//     pages:{
//         signIn: '/sign-in',
//     },
//     session:{
//         strategy:"jwt",
//     },
//     secret:process.env.NEXTAUTH_SECRET,
// };
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { username: credentials.identifier },
                            { email: credentials.identifier },
                        ],
                    });
                    if (!user) {
                        console.log('No user found with this email/username');
                        throw new Error('No user found with this email/username');
                    }

                    if (!user.isVerified) {
                        console.log('Please verify your account before login');
                        throw new Error("Please verify your account before login");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        console.log('Incorrect Password');
                        throw new Error("Incorrect Password");
                    }
                } catch (error: any) {
                    console.error('Error in authorize:', error);
                    throw new Error(error.message || 'Authorization error');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessage;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessage;
                session.user.username = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
