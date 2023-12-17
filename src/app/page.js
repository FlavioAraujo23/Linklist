import Header from '@/Components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Header />
      <section className='p-6 pt-32 max-w-4xl mx-auto'>
        <div className='max-w-md mb-8'>
          <h1 className='text-6xl font-bold'>
            Seu único link <br/> para tudo
          </h1>
          <h2 className='text-gray-500 text-xl mt-6'>
            Compartilhe seus links, redes sociais, informações de contato e mais em uma única página!
          </h2>
        </div>
        <form className='inline-flex items-center shadow-lg shadow-gray-500/20'>
          <span className='bg-white py-4 pl-4'>
            linklist.para/
          </span>
          <input type="text" className='py-4' placeholder='Nome do usuário'/>
          <button type="submit" className='bg-blue-500 text-white py-4 px-6'>
            Inscreva-se de graça
          </button>
        </form>

      </section>
    </main>
  
  )
}
