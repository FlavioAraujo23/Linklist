export const metadata = {
  title: 'Linklist',
  description: 'Crie e gerencie seus links em uma unica página!',
}

export default function RootLayout({ children }) {
 return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
