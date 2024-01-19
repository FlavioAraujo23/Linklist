'use client';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {signOut} from "next-auth/react";
export default function LogoutButton({
  iconLeft = false,
}) {
  return (
    <button 
     className={'flex gap-2 items-center border p-2 px-4 shadow'}
     onClick={() => signOut()}>
      {iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={''} />
      )}
      <span>Sair</span>
      {!iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={''} />
      )}
    </button>
  );
}