import HeroForm from '@/Components/forms/HeroForm'
import { getSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getSession(authOptions)
  return (
    <main>
      <section className='pt-16'>
        <div className='max-w-md mb-8'>
          <h1 className='text-6xl font-bold'>
            Seu único link <br/> para tudo
          </h1>
          <h2 className='text-gray-500 text-xl mt-6'>
            Compartilhe seus links, redes sociais, informações de contato e mais em uma única página!
          </h2>
        </div>
        <HeroForm user={session?.user} />
      </section>
    </main>
  
  )
}
