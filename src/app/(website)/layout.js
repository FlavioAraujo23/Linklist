import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/Components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Linklist',
  description: 'Crie e gerencie seus links em uma unica página!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main>
          <Header />
          <div className='md:max-w-4xl max-w-full mx-auto md:p-6 p-4'>
            {children}
          </div>
        </main>
        
      </body>
    </html>
  )
}
