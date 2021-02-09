import React, { useState } from "react";
import ProjectPreview from "../components/ProjectPreview";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Search.module.css";
import { observer } from "mobx-react-lite"


const Search = () => {
  const { projectStore } = useStores();
  const [ query, setQuery] = useState();
  const [ projects, setProjects ] = useState(projectStore.projects);
  const [ selectedSubject, setSubject ] = useState();

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

  return (
    <div className={stylesLayout.gridLayout}>
      <section >
        <ul className={style.searchResults}>
          {!projects.length ?
          <li className={style.noResults} >We found no works matching your query.</li>
          :
          projects.filter(i=>selectedSubject?i.subject.id===selectedSubject:true).map((project, index)=> <ProjectPreview key={index} project={project} />)}
        </ul>
      </section>
      <section className={style.container}>
        <label className={style.searchBar}>
          <img alt={`search icon`} src={`/assets/img/search.svg`}/>
          <input placeholder={`Search`} value={query} onChange={handleChange} />
        </label>
        <ul className={style.searchSubjects}>
          {projectStore.subjects.map((item, index) => <li key={index} className={item.id===selectedSubject?style.activeSubject:null} onClick={()=>setSubject(item.id)}>{item.title}</li>)}
        </ul>
      </section>
    </div>
  );
};

export default observer(Search);
