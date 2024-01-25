'use client';
import { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function HeroForm({user}) {
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
      if (user) {
        redirect('/account?desiredUsername='+username);
      } else {
        window.localStorage.setItem('desiredUsername', username);
        await signIn('google');
      }
    }
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20 w-max"
    >
      <span className="bg-white md:py-4 md:pl-4" style={{padding: '0.5rem 0 0.5rem 0.5rem'}}>
        linklist.para/
      </span>
    <input
      type="text"
      style={{backgroundColor:'white',marginBottom:0,paddingLeft:0, width:'6rem'}}
      placeholder="username"/>
    <button
      type="submit"
      style={{backgroundColor:'#2563EB', color:'white', padding: '1.5rem 1rem 1.5rem 1rem'}}
      className="py-2 px-4 whitespace-nowrap md:w-56 w-max h-16 flex items-center"
    >
      Inscreva-se de graça!
    </button>
  </form>
  );
}
