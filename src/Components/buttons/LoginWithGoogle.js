'use client';
import {signIn} from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginWithGoogle() {
  return (
    <button
     onClick={async () => { await signIn('google')}}
     className="bg-white shadow text-center w-full py-4 flex gap-3 items-center justify-center">
      <FontAwesomeIcon icon={faGoogle} className="h-6"/>
      <span>Entrar com o Google</span>
    </button>
  )
}