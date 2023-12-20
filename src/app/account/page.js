import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';
import RightIcon from "@/Components/icons/RightIcon";

export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  if(!session) {
    redirect('/')
  }
  return(
    <div>
      <form>
        <h1 className="text-4xl font-bold text-center mb-2">
          Pegue seu nome de usuário
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Escolha seu nome de usuário
        </p>
        <div className="max-w-xs mx-auto">
          <input
           className="block p-2 mx-auto border w-full mb-2 text-center"
           defaultValue={desiredUsername}
           type="text" 
           placeholder="username" 
          />
          <button 
           type="submit"
           className="bg-blue-500 text-white py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center">
            <span>Convidar usuário</span>
            <RightIcon />
          </button>
        </div>
        
      </form>
    </div>
  )
}