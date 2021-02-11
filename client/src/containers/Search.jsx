import React, { useState, useEffect } from "react";
import ProjectPreview from "../components/ProjectPreview";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Search.module.css";
import { observer } from "mobx-react-lite"
import { observe } from "mobx";
import cx from 'classnames';


const Search = () => {
  const { projectStore } = useStores();
  const [ query, setQuery] = useState();
  const [ projects, setProjects ] = useState(projectStore.projects);
  const [ studies, setStudies ] = useState(projectStore.studies.map((i)=>{return {...i, selected: false}}))
  const [ selectedSubject, setSubject ] = useState();
  const [ filterOpen, setFilterOpen ] = useState(false);
  const [ advanced, setAdvanced ] = useState(false);
  const [ split, setSplit ] = useState(true);
  observe(projectStore.studies, () => {
    if(studies.length===0)setStudies(projectStore.studies.map((i)=>{return {...i, selected: false}}));
  });

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    const arr = [...projectStore.projects];
    if(val!==``){  
      setProjects(arr.filter((p)=>(p.title.toLowerCase().indexOf(val)!==-1||p.user.name.toLowerCase().indexOf(val)!==-1||p.user.surname.toLowerCase().indexOf(val)!==-1)));
      setQuery(e.target.value);
    }else{
      setProjects(arr);
      setQuery(e.target.value);
    }
  }

  const check = () => {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName(`body`)[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    setSplit(windowWidth > 1000);
    return windowWidth > 1000;
  }

  useEffect(()=>{
    check();
    window.addEventListener(`resize`, check);
    return () => {
      window.removeEventListener(`resize`, check);
    };
  });

  return (
    <div className={cx(stylesLayout.gridLayout, style.wrapper)}>
      <section className={style.container}>
        <label className={style.searchBar}>
          <img alt={`search icon`} src={`/assets/img/search.svg`}/>
          <input placeholder={`Search`} value={query} onChange={handleChange} />
        </label>
        <div className={style.filterSort}>
          <div className={style.filterWrapper}>
            <div className={style.filterSortButton} onClick={()=>setFilterOpen(!filterOpen)}>
              <img alt={`Filter icon`} src={`/assets/img/icons/filter.svg`} />
              <span>Filter</span>
            </div>
            <ul className={cx(style.contentList, filterOpen&&split?style.active:null)}>
              {studies.map((i)=><li onClick={()=>{
                i.selected=!i.selected;
                setStudies([...studies]);
                }} key={i.id} className={i.selected?style.selected:null}>{i.title}</li>)}
            </ul>
          </div>
          {!split&&filterOpen?<div className={style.filterSortButton} onClick={()=>setAdvanced(!advanced)}>
            <img alt={`Filter icon`} src={`/assets/img/icons/filter.svg`} />
            <span>{advanced?`subject`:`education`}</span>
          </div>:null}
        </div>
        <ul className={cx(style.searchSubjects, !split&&!filterOpen?style.collapsed:null)}>
          {split?(
            projectStore.subjects.map((item, index) => <li key={index} className={item.id===selectedSubject?style.activeSubject:null} onClick={()=>setSubject(item.id)}>{item.title}</li>)
          ):advanced?(
            studies.map((item, index) => <li key={index} className={item.selected?style.activeSubject:null} onClick={()=>{
              item.selected=!item.selected;
              setStudies([...studies]);
              }}>{item.title}</li>)
          ):(
            projectStore.subjects.map((item, index) => <li key={index} className={item.id===selectedSubject?style.activeSubject:null} onClick={()=>setSubject(item.id)}>{item.title}</li>)
          )}
        </ul>
      </section>
      <section className={style.leftContainer}>
        <ul className={style.searchResults}>
          {!projects.length ?
          <li className={style.noResults} >We found no works matching your query.</li>
          :
          projects.filter(i=>selectedSubject?i.subject.id===selectedSubject:true).filter(i=>!studies.find(a=>a.selected===true)||(studies.find(a=> a.id === i.study.id)&&studies.find(a=> a.id === i.study.id).selected===true)).map((project, index)=> <ProjectPreview key={index} project={project} />)}
        </ul>
        <img alt={`background`} src={`/assets/img/catalogusRaster.png`} className={style.backgroundRaster} />
      </section>

    </div>
  );
};

export default observer(Search);
