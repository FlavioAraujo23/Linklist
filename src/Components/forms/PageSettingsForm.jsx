'use client';
import { faCloudArrowUp, faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
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
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {    
      const result = await savePageActions(formData);
      if (result) {
        toast.success('Alterações salvas')
      }
  }
  async function upload(ev, callbackFn) {
    
      const file = ev.target.files?.[0];
      if (file) {
        const uploadPromise = new Promise((resolve, reject) => {
          const data = new FormData;
          data.set('file', file);
          fetch('/api/upload', {
            method: 'POST',
            body:data,
          }).then(response => {
            if (response.ok) {
              response.json().then(link => {
                callbackFn(link);
                resolve(link);
              });            
              } else {
                reject();
              }
          });
        });
  
        toast.promise(uploadPromise, {
          loading: 'Carregando...',
          success: 'Salvo',
          error: 'Erro no carregamento!',
        })
      }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, link => {
      setBgImage(link);
    });
  }

  async function handleAvatarImageChange(ev) {
    await upload(ev, link => {
      setAvatar(link);
    })
  }
  
  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div 
          className="bg-gray-300 py-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
          style={
            bgType === 'color' 
            ? {backgroundColor:bgColor} 
            : {backgroundImage:`url(${bgImage})`}
          }
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
                  <label className="bg-white shadow px-4 py-2 mt-2 flex gap-2">
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input 
                     type="file"
                     onChange={handleCoverImageChange}
                     className="hidden"
                    />
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-700"/>
                      <span>Trocar imagem</span>                      
                    </div>

                  </label>
                </div>
              )}
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <div className="relative -top-8 w-[128px] h-[128px]">
            <div className="overflow-hidden h-full rounded-full  border-4 border-white shadow shadow-black/50">
              <Image 
                className="w-full h-full object-cover"
                src={avatar}
                objectFit="cover"
                alt="avatar"
                width={128}
                height={128}
              />              
            </div>
            <label
              htmlFor="avatarIn" 
              className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
            >
              <FontAwesomeIcon size="xl" icon={faCloudArrowUp}/>
            </label>
            <input 
              id="avatarIn"
              type="file"
              className="hidden"
              onChange={handleAvatarImageChange}
            />
            <input type="hidden" name="avatar" value={avatar} />
          </div>
          
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
