import { Inter } from 'next/font/google'
import '../../globals.css'

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
          {children}
        </main>
      </body>
    </html>
  )
}
