import LoginWithGoogle from "@/Components/buttons/LoginWithGoogle";


export default function LoginPage() {
  return (
    <div>
      <div className="p-4 max-w-xs mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          Entrar
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Entre em sua conta usando um dos métodos abaixo
        </p>
        <LoginWithGoogle />
      </div>
      
    </div>
  )
}