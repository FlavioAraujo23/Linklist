import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PageSettingsForm({page}) {
  const session = await getServerSession(authOptions)
  return (
    <div className="-m-4">
      <form>
        <div className="bg-gray-300 py-16 flex justify-center items-center">
          <RadioTogglers 
           options={[
            {value: 'color', icon: faPalette, label: 'Color'},
            {value: 'image', icon: faImage, label: 'Image'},
           ]} 
           onChange={''} />
        </div>
        <div className="flex justify-center">
          <Image 
           className="rounded-full relative -top-8 border-4 border-white shadow shadow-black/50"
           src={session?.user?.image}
           alt="avatar"
           width={128}
           height={128}
          />
          
      </form>
    </div>
  );
}


