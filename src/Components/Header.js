import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className='bg-white border-b py-4'>
      <div className='flex md:px-6 px-4' style={{justifyContent:'space-around'}}>
        <div className='flex items-center md:gap-6 gap-4 pr-2 md:pr-0'>
          <Link href={'/'} className="flex items-center gap-2 text-blue-500">
            <FontAwesomeIcon icon={faLink} className="text-blue-500"/>
            <span className="font-bold">LinkList</span>
          </Link>
          <nav className='flex items-center gap-2 md:gap-4 text-slate-500 text-sm'>
            <Link href={'/about'}>Sobre</Link>
            <Link href={'/pricing'}>Preço</Link>
            <Link href={'/contact'}>Contato</Link>
          </nav>
        </div>
        <nav className='flex pl-4 md:pl-0 items-center text-xs gap-1 md:gap-4 md:text-sm text-slate-500'>
          {!!session && (
              <>
                <Link href={'/account'} className="w-12">
                  Hello, {session?.user?.name}
                </Link>
                <LogoutButton />
              </>
            )}
            {!session && (
              <>
                <Link href={'/login'}>Sign In</Link>
                <Link href={'/login'}>Create Account</Link>
              </>
            )}
        </nav>
      </div>
    </header>
  );
}