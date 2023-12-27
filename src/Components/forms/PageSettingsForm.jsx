'use client';
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import RadioTogglers from "../formItems/RadioTogglers";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import savePageActions from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function PageSettingsForm({page,user}) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  async function saveBaseSettings(formData) {    
      const result = await savePageActions(formData);
      if (result) {
        toast.success('Alterações salvas')
      }
  }
  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div 
          className="bg-gray-300 py-16 flex justify-center items-center"
          style={{backgroundColor:bgColor}}
        >
          <div>
            <RadioTogglers 
              defaultValue={page.bgType}
              options={[
                {value: 'color', icon: faPalette, label: 'Color'},
                {value: 'image', icon: faImage, label: 'Image'},
              ]}
              onChange={val => setBgType(val)}
            />
            
              {bgType === 'color' && (
                <div className="bg-gray-200 shadow mt-2 text-gray-700 p-2">
                  <div className="flex gap-2 justify-center">
                    <span>Escolha a cor</span>
                    <input
                    type="color"
                    name="bgColor"
                    defaultValue={page.bgColor}
                    onChange={ev => setBgColor(ev.target.value)}
                    />
                  </div>
                </div>
              )}
              {bgType === 'image' && (
                <div className="flex justify-center">
                  <input type="file" name="" id="" />
                  <button
                   type="button"
                   className="bg-white shadow px-4 py-2 mt-2"
                  >
                    Trocar imagem
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <Image 
           className="rounded-full relative -top-8 border-4 border-white shadow shadow-black/50"
           src={user?.image}
           alt="avatar"
           width={128}
           height={128}
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">Nome</label>
          <input 
           type="text"
           id="nameIn"
           name="displayName"
           defaultValue={page.displayName}
           placeholder="Cazé"
          />
          <label className="input-label" htmlFor="locationIn">Localização</label>
          <input 
           type="text"
           id="locationIn"
           name="location"
           defaultValue={page.location}
           placeholder="Algum lugar no mundo"
          />
          <label className="input-label" htmlFor="bioIn">Bio</label>
          <textarea 
           name="bio"
           defaultValue={page.bio}
           id="bioIn"
           placeholder="Sua bio vai aqui..."
          />
          <div className="max-w-[200px] mx-auto">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              <span>Salvar</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}


