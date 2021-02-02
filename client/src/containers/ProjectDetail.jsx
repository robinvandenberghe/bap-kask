import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import lz from 'lzutf8';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Text } from '../components/selectors';
import { RenderNode, Viewport } from '../components/editor';
import { Custom1, OnlyButtons } from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../components/selectors/Custom3';
import { Button } from '../components/selectors/Button';
import { Video } from '../components/selectors/Video';
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projectStore, uiStore } = useStores();
  const { id, user, study, title, subject, content} = projectStore.projects.find((item)=>item.slug===slug);
  const [ query, setQuery ] = useState();
  const [ saved, setSaved ] = useState(uiStore.savedWorks.find(i=>i===id)?true:false);
  const [enabled] = useState(false);
  const uint8array = lz.decodeBase64(content);
  const json = lz.decompress(uint8array);

  const handleSave = async () => {
    const r = await uiStore.saveWork(id);
    if(r.success){
      setSaved(r.saved);
    }
  }

  return (
    <section className={stylesLayout.layout}>
        <div className={style.searchSave}>
          {uiStore.authUser?
          <div className={classNames(style.saveWork, saved ? style.saved : null)} onClick={handleSave}>
            {saved ? <img alt={`save icon`} src={`/assets/img/bookmark.svg`}/> : <img alt={`save icon`} src={`/assets/img/save.svg`}/>}
            <span>{saved? `Opgeslagen` : `Opslaan`}</span>
          </div>
          :null}
        </div>
        <Editor
          resolver={{
            Container,
            Text,
            Custom1,
            Custom2,
            Custom2VideoDrop,
            Custom3,
            Custom3BtnDrop,
            OnlyButtons,
            Button,
            Video,
          }}
          enabled={enabled}
          onRender={RenderNode}
        >
          <Viewport>
            <div className={style.infoContainer}>
              <h4>{user.name + ` ` + user.surname}</h4>
              <p className={style.subjectTitle}>{study.title + ` - ` + subject.title}</p>
            </div>
            <Frame data={json}>

            </ Frame>
          </Viewport>
        </Editor>

    </section>
  );
};

const slugify = (string)  => {
  return string
      .normalize(`NFD`) // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, ``) // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, ``) // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, `-`) // separator
}

export default ProjectDetail;
