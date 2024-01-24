import {useFormStatus} from 'react-dom';
export default function SubmitButton({children}) {
  const {pending} = useFormStatus();
  return (
    <button 
     type="submit"
     disabled={pending}
     style={{backgroundColor:'#3B82F6', color: 'white', padding:'0.5rem 1rem 0.5rem 1rem'}}
     className={"disabled:bg-blue-300 text-gray-50 disabled:text-gray-400 mx-auto max-w-xs flex gap-2 items-center justify-center"}>
      {pending && (
        <span>Salvando...</span>
      )}
      {!pending && children}
   </button>
  )
}

