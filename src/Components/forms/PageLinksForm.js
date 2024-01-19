'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from '@/libs/upload';
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({user, page}) {
  const [links, setLinks] = useState(page.links || []);

  async function save() {
    await savePageLinks(links);
    toast.success('Salvo!')
  }

  function addNewLink() {
    setLinks(prev => {
      return [...prev, {
        key: Date.now().toString(),
        title:'',
        subtitle:'',
        icon:'',
        url:''
      }];
    });
  }

  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (url) => {
      setLinks(prevLinks => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if(link.key === linkKeyForUpload) {
            link.icon = url;
          }
        });
        return newLinks;
      });
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks(prev => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if(link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    })
  }

  function removeLink(linkKeyToRemove) {
    setLinks(prevLinks =>
      [...prevLinks].filter(l => l.key !== linkKeyToRemove)
    );
  }
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus} />
          <span>Adicionar</span>
        </button>
        <div className="">
          <ReactSortable handle=".handle" list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                  <FontAwesomeIcon 
                    className="text-gray-500 mr-2 cursor-pointer"
                    icon={faGripLines} 
                  />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 w-16 h-16 relative aspect-square inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="object-cover w-full h-full"
                        src={l.icon}
                        alt="icon"
                        width={64}
                        height={64}
                      />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon size="xl" icon={faLink} />
                    )}       
                  </div>
                  <div>
                    <input 
                      onChange={() => handleUpload(ev,l.key)}
                      id={'icon'+l.key}
                      type="file" 
                      className="hidden"
                    />
                    <label htmlFor={'icon'+l.key} className="border text-gray-700 mt-2 p-2 flex items-center gap-1 cursor-pointer mb-2 justify-center">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Trocar icone</span>
                    </label>
                    <button 
                      onClick={() => removeLink(l.key)}
                      type="button"
                      className="bg-gray-300 w-full py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remover este link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="input-label">TITULO:</label>
                  <input
                    value={l.title}
                    onChange={ev => handleLinkChange(l.key, 'title', ev)} 
                    type="text" 
                    placeholder="Titulo"
                  />
                  <label className="input-label">SUBTITULO:</label>
                  <input 
                    value={l.subtitle}
                    onChange={ev => handleLinkChange(l.key, 'subtitle', ev)}
                    type="text" 
                    placeholder="Descrição (opcional)"
                  />
                  <label className="input-label">URL:</label>
                  <input
                    value={l.url}
                    onChange={ev => handleLinkChange(l.key, 'url', ev)}
                    type="text"
                    placeholder="url" 
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}