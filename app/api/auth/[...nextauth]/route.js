import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'
import { signOut } from 'next-auth/react'
import { Admin } from '@/models/admin'
import { mongooseConnect } from '@/lib/mongoose'


async function isAdminEmail(email){
  // return true
  await mongooseConnect();
  return !!(await Admin.findOne({email}));
}
// export const authOption = NextAuth({
export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),

  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks:{
    session: async ({session,token,user}) => {
      if(await isAdminEmail(session?.user?.email)){
        // console.log({session,token,user})
        // console.log(adminEmails)
        return session;
      } else {
        return false;
      }
    }
  }
}

const handler = NextAuth(authOptions)

// export {authOption as GET, authOption as POST}
export {handler as GET, handler as POST}
// export default handle


export async function isAdminRequest(){
  const session = await getServerSession(authOptions);
  // console.log(session?.user?.email)
  // console.log(adminEmails)
  if(! (await isAdminEmail(session?.user?.email))){
    throw 'not an admin';
    
  }
}