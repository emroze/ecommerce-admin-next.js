"use client"
import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function LogAuthPage({children}) {
  const { data:session } = useSession();
  if(!session){
    return (
      <div className="bg-slate-800 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with google</button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-slate-800 min-h-screen flex">
        <Nav/>
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 p-4 rounded-lg">{children}</div>
    </div>
  )
  
}
