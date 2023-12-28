'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { ReactSortable } from "react-sortablejs";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from './../buttons/SubmitButton';
import { SavePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

const allButtons = [
  {key: 'email', 'label':'e-mail', icon: faEnvelope, placeholder: 'teste@exemplo.com'},
  {key: 'mobile', 'label':'mobile', icon: faMobile, placeholder: '+55 11 9999-9999'},
  {key: 'instagram', 'label':'instagram', icon: faInstagram, placeholder: 'test@example.com'},
  {key: 'facebook', 'label':'facebook', icon: faFacebook, placeholder: 'https://facebook.com/profile/...'},
  {key: 'discord', 'label':'discord', icon: faDiscord},
  {key: 'tiktok', 'label':'tiktok', icon: faTiktok},
  {key: 'youtube', 'label':'youtube', icon: faYoutube},
  {key: 'whatsapp', 'label':'whatsapp', icon: faWhatsapp},
  {key: 'github', 'label':'github', icon: faGithub},
  {key: 'telegram', 'label':'telegram', icon: faTelegram},
];

function upperFirst(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1)
}

export default function PageButtonsForm({user, page}) {

  const pageSavedButtonsKeys = Object.keys(page.buttons);
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map(k => allButtons.find(b => b.key === k));
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function addButtonToProfile(button) {
    setActiveButtons(prevButtons => {
      return [...prevButtons, button];
    });
  }

  async function saveButtons(formData) {
    await SavePageButtons(formData);
    toast.success('Configurações salvas!');
  }

  function removeButton({key:keyToRemove}) {
    setActiveButtons(prevButtons => {
      return prevButtons.filter(button => button.key !== keyToRemove);
    });
  }

  const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Botões</h2>
        <ReactSortable list={activeButtons} setList={setActiveButtons}>
          {activeButtons.map(button => (
            <div className="mb-4 flex items-center" key={button.key}>
              <div className="w-48 flex h-full text-gray-700 p-2 gap-2 items-center">
                <FontAwesomeIcon icon={faGripLines} className="cursor-pointer text-gray-400"/>
                <FontAwesomeIcon icon={button.icon} />
                <span>{upperFirst(button.label)}:</span>
              </div>
              <input
                placeholder={button.placeholder} 
                name={button.key}
                type="text"
                defaultValue={page.buttons[button.key]}
                style={{marginBottom:'0'}} 
              />
              <button 
                type="button"
                className="p-2 px-4 bg-gray-300 cursor-pointer"
                onClick={() => removeButton(button)}  
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map((button) => (
            <button
              type="button"
              onClick={() => addButtonToProfile(button)} 
              key={button.key}
              className="flex gap-1 items-center p-2 bg-gray-200"
            >
                <FontAwesomeIcon icon={button.icon} />
                <span>{upperFirst(button.label)}</span>
                <FontAwesomeIcon icon={faPlus} />
            </button>          
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave}/>
            <span>Salvar</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  )
}