'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import LogoutButton from '@/Components/buttons/LogoutButton';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className='flex mx-auto flex-col text-center mt-8 gap-6 text-gray-500'>
      <Link
       href={'/account'}
       className={'flex gap-4 p-2' + (path === '/account' ? 'text-blue-500' : '')}>
        <FontAwesomeIcon 
         fixedWidth={true}
         icon={faFileLines} 
         className='w-6 h-6'
        />
        <span>Minha página</span>
      </Link>
      <Link
       href={'/analytics'}
       className={'flex gap-4 p-2' + (path === '/analytics' ? 'text-blue-500' : '')}>
        <FontAwesomeIcon 
         fixedWidth={true}
         icon={faChartLine} 
         className='w-6 h-6'
        />
        <span>Analytics</span>
      </Link>
      <LogoutButton 
       className='flex gap-4 items-center text-gray-500 p-2'
       iconLeft={true} 
       iconClasses={'w-6 h-6'}
      />
      <Link href={'/'} className='flex gap-2 items-center text-xs text-gray-500 border-t pt-4'>
        <FontAwesomeIcon 
        icon={faArrowLeft} 
        className='w-4 h-4'
        />
        <span>Voltar ao início</span>
      </Link>
    </nav>
  );
}