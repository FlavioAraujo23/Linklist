import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Image from "next/image"
import { headers } from 'next/headers'
import AppSidebar from '@/Components/layout/AppSidebar'
import { Toaster } from 'react-hot-toast'
import { Page } from '@/models/Page'
import mongoose from 'mongoose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faLink } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Linklist',
  description: 'Crie e gerencie seus links em uma unica página!',
}

export default async function AppTemplate({ children }) {
  const headersList = headers();
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect('/')
  }

  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({owner: session.user.email});

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Toaster/>
        <main className='md:flex min-h-screen'>
          <label htmlFor='navCb' className='md:hidden ml-8 mt-4 border p-4 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer'>
            <FontAwesomeIcon icon={faBars} />
            <span>Menu</span>
          </label>
          <input type="checkbox" id="navCb" className='hidden'/>
          <label htmlFor="navCb" className=" hidden backdrop fixed inset-0 bg-black/80 z-10"></label>
          <aside className='bg-white w-48 p-4 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all'>
            <div className="sticky top-0 pt-2">
              <div className='rounded-full overflow-hidden aspect-square w-24 mx-auto'>
                <Image src={session.user.image} width={256} height={256} alt={'avatar'} />
              </div>
              {page && (
                <Link
                  target='_blank'
                  href={'/'+page.uri} 
                  className="text-center mt-4 flex gap-1 items-center justify-center"
                >
                    <FontAwesomeIcon size='lg' icon={faLink} className='text-blue-500'/>
                    <span className='text-xl text-gray-300'>/</span>
                    <span>{page.uri}</span>
                </Link>              
              )}

              <div className='text-center'>
                <AppSidebar />
              </div>
            </div>
          </aside>      
          <div className='grow'>
              {children}
          </div>
        </main>     
      </body>
    </html>
  )
}
