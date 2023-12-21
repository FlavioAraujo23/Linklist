'use client';
import RightIcon from "@/Components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
import { redirect } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";


export default function UsernameForm({desiredUsername}) {
  const [taken, setTaken] = useState(false);
  async function handleSubmit(formData) {
    const result = await grabUsername(formData);
    setTaken(result === false);
    if(result) {
      redirect('/account?created='+formData.get('username'));
    }
  }

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Pegue seu nome de usuário
      </h1>
      <p className="text-center mb-6 text-gray-500">
        Escolha seu nome de usuário
      </p>
      <div className="max-w-xs mx-auto">
        <input
         name="username"
         className="block p-2 mx-auto border w-full mb-2 text-center"
         defaultValue={desiredUsername}
         type="text" 
         placeholder="username" 
        />
        {taken && (
           <div className="bg-red-200 border border-red-600 py-2 mb-2 text-center">
             Usuário já existe
           </div>
        )}
        <SubmitButton>
          <span>Convidar usuário</span>
          <RightIcon />
        </SubmitButton>
      </div>    
    </form>
  );
}