import {useFormStatus} from 'react-dom';
export default function SubmitButton({children, className}) {
  const {pending} = useFormStatus();
  const isStringClassName = typeof className === 'string';
  return (
    <button 
     type="submit"
     disabled={pending}
     className={"bg-blue-500 disabled:bg-blue-300 text-white disabled:text-gray-400 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center " + className || ''}>
      {pending && (
        <span>Salvando...</span>
      )}
      {!pending && children}
   </button>
  )
}

