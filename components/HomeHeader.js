import { useSession } from "next-auth/react";


export default function HomeHeader(){
    const { data:session } = useSession();
    return(
        <div className="text-slate-600 flex justify-between">
            <h2 className="mt-0">
                <div className="flex gap-3 items-center">
                    <img src={session?.user?.image} alt="" className="w-6 h-6 rounded-md sm:hidden"/>
                    <div>Hello, <b>{session?.user?.name}</b></div>
                </div>
            </h2>
            <div className="hidden sm:block">
                <div className="flex bg-slate-300 text-black gap-1 rounded-lg overflow-hidden">
                <img src={session?.user?.image} alt="" className="w-6 h-6"/>
                <span className="px-2">
                    {session?.user?.name}
                </span>
                </div>
            </div>
        </div>
    )
}