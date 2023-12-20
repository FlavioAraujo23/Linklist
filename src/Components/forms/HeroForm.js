'use client';
import { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function HeroForm() {
  useEffect(() => {
    if('localStorage' in window && window.localStorage.getItem('desiredUsername')) {
      const username =  window.localStorage.getItem('desiredUsername');
      window.localStorage.removeItem('desiredUsername');
      redirect('/account?desiredUsername=' + username);
    }
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    signIn('google');
    const form = e.target;
    const input = form.querySelector('input');
    const username = input.value
    if (username.length > 0) {
      window.localStorage.setItem('desiredUsername', username)
    }
  }

  return (
    <form 
     onSubmit={handleSubmit}
     className='inline-flex items-center shadow-lg shadow-gray-500/20'>
      <span className='bg-white py-4 pl-4'>
        linklist.para/
      </span>
      <input
       type="text" 
       className='py-4' 
       placeholder='Nome do usuário'
      />
      <button 
       type="submit" 
       className='bg-blue-500 text-white py-4 px-6'>
        Inscreva-se de graça
      </button>
    </form>
  );
}
