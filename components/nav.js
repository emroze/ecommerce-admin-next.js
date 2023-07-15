import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./logo";

export default function Nav({show,toogleNavBar}) {
  const inactiveLink = "flex items-center gap-1 pl-1 hover:bg-highlight hover:rounded-sm "
  const activeLink = inactiveLink + "bg-highlight text-black rounded-sm "
  const inactiveIcon = 'h-5 w-5'
  const activeIcon = inactiveIcon + " text-primary "
  const pathName = usePathname();
  const router = useRouter();
  function toogleNavOptionView(path, Dir){
    if(Dir==='/'){
      return(
        (path===Dir) ? activeLink : inactiveLink
      )
    }
    return (
      path.includes(Dir) ? activeLink : inactiveLink
    )
  }

  function toogleIconView(path, Dir){
    if(Dir==='/'){
      return(
        (path===Dir) ? activeIcon : inactiveIcon
      )
    }
    return (
      path.includes(Dir) ? activeIcon : inactiveIcon
    )
  }

  async function logout(){
    router.push('/');
    signOut();
  }

  return (
  <div className={(show?'left-0':'-left-full')+" top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"}>
    <div className="mb-4 mr-5 flex items-center justify-between">
      <Logo/>
      <div onClick={toogleNavBar} className=" hover:bg-gray-200 p-1 rounded-md md:hidden">  {/* Cancel Button */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <nav>
      <Link onClick={toogleNavBar} href={'/'} className={toogleNavOptionView(pathName,'/')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
        className={toogleIconView(pathName,'/')}>
          <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
        </svg>
        Dashboard
      </Link>
      <Link onClick={toogleNavBar} href={'/products'} className={toogleNavOptionView(pathName,'/products')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
      className={toogleIconView(pathName,'/products')}>
        <path fillRule="evenodd" d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 4.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM10 9a.75.75 0 01.75.75v2.546l.943-1.048a.75.75 0 111.114 1.004l-2.25 2.5a.75.75 0 01-1.114 0l-2.25-2.5a.75.75 0 111.114-1.004l.943 1.048V9.75A.75.75 0 0110 9z" clipRule="evenodd" />
      </svg>
        Products
      </Link>
      <Link onClick={toogleNavBar} href={'/categories'} className={toogleNavOptionView(pathName,'/categories')}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
      className={toogleIconView(pathName,'/categories')}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
        Categories
      </Link>
      <Link onClick={toogleNavBar} href={'/orders'} className={toogleNavOptionView(pathName,'/orders')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
      className={toogleIconView(pathName,'/orders')}>
        <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z" />
      </svg>
        Orders
      </Link>
      <Link onClick={toogleNavBar} href={'/admins'} className={toogleNavOptionView(pathName,'/admins')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
      className={toogleIconView(pathName,'/admins')}>
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
      </svg>
        Admins
      </Link>
      <Link onClick={toogleNavBar} href={'/settings'} className={toogleNavOptionView(pathName,'/settings')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
      className={toogleIconView(pathName,'/settings')+' h-4'}>
        <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
      Settings
      </Link>
      <Link href={'/'} onClick={logout} className={inactiveLink + " hover:text-red-600"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className={inactiveIcon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        Logout
      </Link>
      
      
    </nav>

  </div>
  );
}
