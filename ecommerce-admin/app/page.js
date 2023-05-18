"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data:session } = useSession();
  if(!session){
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with google</button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div>Logged in {session.user.email}</div>
    </div>
  )
  
}



// export default function Component() {
//   const { data: session } = useSession()
//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
//   return <>
//     Not signed in <br/>
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }