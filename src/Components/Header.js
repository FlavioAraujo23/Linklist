import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className='bg-white border-b py-4'>
      <div className='max-w-4xl flex justify-between mx-auto px-6'>
        <div className='flex gap-6'>
          <Link href={'/'}>LinkList</Link>
          <nav className='flex items-center gap-4 text-slate-500 text-sm'>
            <Link href={'/about'}>Sobre</Link>
            <Link href={'/pricing'}>Preço</Link>
            <Link href={'/contact'}>Contato</Link>
          </nav>
        </div>
        <nav className='flex gap-4 text-sm text-slate-500'>
          {!!session && (
              <>
                <Link href={'/account'}>
                  Hello, {session?.user?.name}
                </Link>
                
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