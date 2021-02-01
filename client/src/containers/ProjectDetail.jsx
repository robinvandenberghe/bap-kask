import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projectStore, uiStore } = useStores();
  const { id, user, study, title, subject, brief} = projectStore.projects.find((item)=>item.slug===slug);
  const [ query, setQuery ] = useState();
  const [ saved, setSaved ] = useState(uiStore.savedWorks.find(i=>i===id)?true:false);

  const handleSave = async () => {
    const r = await uiStore.saveWork(id);
    if(r.success){
      setSaved(r.saved);
    }
  }

  return (
    <div className={stylesLayout.gridLayout}>
      <section >

      </section>
      <section className={style.container}>
        <div className={style.searchSave}>
          <label className={style.searchBar}>
            <img alt={`search icon`} src={`/assets/img/search.svg`}/>
            <input placeholder={`Zoeken`} value={query} onChange={(e)=>setQuery(e.target.value)} />
          </label>
          {uiStore.authUser?
          <div className={classNames(style.saveWork, saved ? style.saved : null)} onClick={handleSave}>
            {saved ? <img alt={`save icon`} src={`/assets/img/bookmark.svg`}/> : <img alt={`save icon`} src={`/assets/img/save.svg`}/>}
            <span>{saved? `Opgeslagen` : `Opslaan`}</span>
          </div>
          :null}
        </div>

        <div className={style.infoContainer}>
          <h4>{user.name + ` ` + user.surname}</h4>
          <p className={style.subjectTitle}>{subject.title}</p>
          <p className={style.projectBrief}>{brief}</p>
        </div>
      </section>
    </div>
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
