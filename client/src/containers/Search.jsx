import React, { useState } from "react";
import ProjectPreview from "../components/ProjectPreview";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Search.module.css";

const Search = () => {
  const { projectStore } = useStores();
  const [ query, setQuery] = useState();
  return (
    <div className={stylesLayout.gridLayout}>
      <section >
        <ul className={style.searchResults}>
          {projectStore.projects.map((project, index)=> <ProjectPreview key={index} project={project} />)}
        </ul>
      </section>
      <section className={style.container}>
        <label className={style.searchBar}>
          <img alt={`search icon`}  src={`./assets/img/search.svg`}/>
          <input placeholder={`Zoeken`} value={query} onChange={(e)=>setQuery(e.target.value)} />
        </label>
      </section>
    </div>
  );
};

export default (Search);
