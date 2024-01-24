import {useFormStatus} from 'react-dom';
export default function SubmitButton({children}) {
  const {pending} = useFormStatus();
  return (
    <button 
     type="submit"
     disabled={pending}
     style={{backgroundColor:'#3B82F6', color: 'white'}}
     className={"disabled:bg-blue-300 text-gray-50 disabled:text-gray-400 py-2 px-4 mx-auto max-w-xs flex gap-2 items-center justify-center"}>
      {pending && (
        <span>Salvando...</span>
      )}
      {!pending && children}
   </button>
  )
}

