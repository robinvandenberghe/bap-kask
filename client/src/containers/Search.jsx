import React, { useState } from "react";
import ProjectPreview from "../components/ProjectPreview";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Search.module.css";

const Search = () => {
  const { projectStore } = useStores();
  const [ query, setQuery] = useState();
  const [ projects, setProjects ] = useState(projectStore.projects);

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
          <li className={style.noResults} >Er zijn geen resultaten gevonden</li>
          :
          projects.map((project, index)=> <ProjectPreview key={index} project={project} />)}
        </ul>
      </section>
      <section className={style.container}>
        <label className={style.searchBar}>
          <img alt={`search icon`} src={`/assets/img/search.svg`}/>
          <input placeholder={`Zoeken`} value={query} onChange={handleChange} />
        </label>

      </section>
    </div>
  );
};

export default (Search);
