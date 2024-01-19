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
    className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20"
    >
      <span className="bg-white py-4 pl-4">
        linklist.para/
      </span>
    <input
      type="text"
      style={{backgroundColor:'white',marginBottom:0,paddingLeft:0}}
      placeholder="username"/>
    <button
      type="submit"
      className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap"
    >
      Inscreva-se de graça!
    </button>
  </form>
  );
}
