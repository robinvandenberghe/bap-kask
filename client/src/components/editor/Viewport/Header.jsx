import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import {ReactComponent as Save} from './../icons/save.svg';
import {ReactComponent as Back} from './../icons/back.svg';
import {ReactComponent as Edit} from './../icons/edit.svg';
import {ReactComponent as Chat} from './../icons/chatWhiteFill.svg';
import {ReactComponent as Bookmark} from './../icons/bookmark.svg';
import {ReactComponent as Bookmarked} from './../icons/bookmarkFillWhite.svg';
import style from './Viewport.module.css';
import { useStores } from '../../../hooks/useStores';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

export const Header = ({project}) => {
  const { enabled, actions: { setOptions }, query } = useEditor((state) => ({ enabled: state.options.enabled }));
  const { id } = project;
  const { uiStore, projectStore } = useStores();
  const history = useHistory();
  const [ saved, setSaved ] = useState(uiStore.savedWorks.find(i=>i===id)?true:false);
   
  const handleBookmark = async () => {
    const r = await uiStore.saveWork(id);
    if(r.success){
      setSaved(r.saved);
    }
  }

  const handleSave = async () =>{
    const serialized = query.serialize();
    const compressed = lz.compress(serialized);
    const base64 = lz.encodeBase64(compressed);
    project.setContent(base64);
    projectStore.updateProject(project);
    setOptions((options) => (options.enabled = !enabled));
  }

  return (
    <section
      enabled={enabled}
      className={style.headerContainer}
    >
      <div className={style.headerButton} onClick={()=>history.goBack()}>
        <Back className={style.headerIcon}/>
        <span>terug</span>
      </div>
      {uiStore.authUser? 
      <div className={style.rightContainer}>
      {enabled?
        <div className={style.headerButton} onClick={handleSave}>
          <Save className={style.headerIcon}/>
          <span>opslaan</span>
        </div>:
        <>
        {uiStore.authUser.role === `student`?
        <div className={style.headerButton} onClick={() => {setOptions((options) => (options.enabled = !enabled));}}>
          <Edit className={style.headerIcon}/>
          <span>bewerken</span>
        </div>:
        <div className={classNames(style.headerButton, style.inverted)} onClick={() => {setOptions((options) => (options.enabled = !enabled));}}>
          <Chat className={style.headerIcon}/>
          <span>chatten</span>
        </div>
        }     
        <div className={classNames(style.headerButton, saved? style.inverted :null)} onClick={handleBookmark}>
          {saved?<Bookmarked className={style.headerIcon}/>:<Bookmark className={style.headerIcon}/>}
          <span>{saved? `opgeslagen`:`opslaan`}</span>
        </div>
        </>
        }

      </div>:null}


    </section>
  );
};
