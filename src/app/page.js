
import HeroForm from '@/Components/forms/HeroForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className='pt-32'>
        <div className='max-w-md mb-8'>
          <h1 className='text-6xl font-bold'>
            Seu único link <br/> para tudo
          </h1>
          <h2 className='text-gray-500 text-xl mt-6'>
            Compartilhe seus links, redes sociais, informações de contato e mais em uma única página!
          </h2>
        </div>
        <HeroForm />
      </section>
    </main>
  
  )
}
