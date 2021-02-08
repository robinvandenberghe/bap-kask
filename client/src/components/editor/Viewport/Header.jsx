import React, { useState, useEffect } from 'react';
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

export const Header = ({object}) => {
  const { enabled, actions: { setOptions }, query } = useEditor((state) => ({ enabled: state.options.enabled }));
  const { item, type, split } = object;
  const { uiStore, projectStore, eventStore } = useStores();
  const history = useHistory();
  const [ saved, setSaved ] = useState(uiStore.savedWorks.find(i=>i===item.id)?true:false);
  const [ wide, setWide ] = useState();
   
  const handleBookmark = async () => {
    const r = await uiStore.saveWork(item.id);
    if(r.success){
      setSaved(r.saved);
    }
  }

  const handleSave = async () =>{
    const serialized = query.serialize();
    const compressed = lz.compress(serialized);
    const base64 = lz.encodeBase64(compressed);
    item.setContent(base64);
    if(type===`project`){
      projectStore.updateProject(item);
    }
    if(type===`event`){
      eventStore.updateEvent(item);
    }
    setOptions((options) => (options.enabled = !enabled));
  }

  const check = () => {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName(`body`)[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    if(windowWidth < 1000 && enabled)setOptions((options) => (options.enabled = false));
    setWide(windowWidth > 1000);
    return windowWidth > 1000;
  }

  useEffect(()=>{
    window.addEventListener(`resize`, check);
    check();
    return ()=>{
      window.removeEventListener(`resize`, check);
    }
  })

  return (
    <section
      enabled={enabled}
      className={style.headerContainer}
    >
      {type===`project`?
      <>
        <div className={style.headerButton} onClick={()=>history.goBack()}>
          <Back className={style.headerIcon}/>
          <span>back</span>
        </div>
        {uiStore.authUser? 
        <div className={style.rightContainer}>
        {enabled?
          <div className={style.headerButton} onClick={handleSave}>
            <Save className={style.headerIcon}/>
            <span>save</span>
          </div>:
          <>
          {(uiStore.authUser.role === `admin` && wide) || (uiStore.authUser.id === item.user.id && wide)?
          <div className={style.headerButton} onClick={() => {setOptions((options) => (options.enabled = !enabled));}}>
            <Edit className={style.headerIcon}/>
            <span>edit</span>
          </div>:
          <div className={classNames(style.headerButton, style.inverted)} onClick={() => {setOptions((options) => (options.enabled = !enabled));}}>
            <Chat className={style.headerIcon}/>
            <span>chat</span>
          </div>
          }     
          <div className={classNames(style.headerButton, saved? style.inverted :null)} onClick={handleBookmark}>
            {saved?<Bookmarked className={style.headerIcon}/>:<Bookmark className={style.headerIcon}/>}
            <span>{saved? `saved`:`save`}</span>
          </div>
          </>
          }

        </div>:null}
      </>
      :null}
      {type===`event`?
        <>
          {split?
          <div/>
          :
          <div className={style.headerButton} onClick={()=>history.goBack()}>
            <Back className={style.headerIcon}/>
            <span>back</span>
          </div>
          }
          {(uiStore.authUser && uiStore.authUser.role === `admin` && wide) ?
            enabled?
            <div className={style.headerButton} onClick={handleSave}>
              <Save className={style.headerIcon}/>
              <span>save</span>
            </div>
            :
            <div className={style.headerButton} onClick={() => {setOptions((options) => (options.enabled = !enabled));}}>
              <Edit className={style.headerIcon}/>
              <span>edit</span>
            </div>
          :null}
        </>
      :null}
    </section>
  );
};
