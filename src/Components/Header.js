import Link from 'next/link';
export default function Header() {
  return (
    <header className='bg-white border-b flex justify-between p-4'>
      <div className='flex gap-6'>
        <Link href={'/'}>LinkList</Link>
        <nav className='flex items-center gap-4 text-slate-500 text-sm'>
          <Link href={'/about'}>Sobre</Link>
          <Link href={'/pricing'}>Preço</Link>
          <Link href={'/contact'}>Contato</Link>
        </nav>
      </div>
      <nav className='flex gap-4 text-sm text-slate-500'>
        <Link href={'/login'}>Entrar</Link>
        <Link href={'/register'}>Cadastrar</Link>
      </nav>
    </header>
  );
}