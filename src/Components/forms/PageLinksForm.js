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
        <h2 className="text-2xl font-bold" style={{marginBottom:'1rem'}}>Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-lg flex gap-2 items-center cursor-pointer"
          style={{color: '#3B82F6'}}
        >
          <FontAwesomeIcon style={{backgroundColor:'#3B82F6', color: 'white', padding:'0.25rem'}}  className="rounded-full aspect-square" icon={faPlus} />
          <span>Adicionar</span>
        </button>
        <div>
          <ReactSortable handle=".handle" list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="md:flex gap-6 items-center" style={{marginTop:'2rem'}}>
                <div className="handle">
                  <FontAwesomeIcon 
                    className="text-gray-500 cursor-pointer"
                    style={{marginRight:'0.5rem'}}
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
                    <label htmlFor={'icon'+l.key} style={{marginTop:'0.5rem', marginBottom:'0.5rem', padding:'0.5rem'}} className="border text-gray-700 flex items-center gap-1 cursor-pointer justify-center">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Trocar icone</span>
                    </label>
                    <button 
                      onClick={() => removeLink(l.key)}
                      type="button"
                      style={{padding:'0.5rem 0.75rem 0.5rem 0.75rem', marginBottom:'0.5rem'}}
                      className="bg-gray-300 w-full h-full flex gap-2 items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remover este link</span>
                    </button>
                  </div>
                </div>
                <div style={{flexGrow: 1}}>
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
        <div className="border-t" style={{paddingTop:'1rem', marginTop:'1rem'}}>
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}