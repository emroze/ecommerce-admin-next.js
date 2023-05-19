'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";


export default function Home(){
  const { data:session } = useSession();
  return (
    <div className="text-slate-600 flex justify-between">
      <div>
        Hello, <b>{session?.user?.name}</b>
      </div>
      <div className="flex bg-slate-300 text-black gap-1 rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
  )
}
