import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite"
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Overview.module.css";
import ProjectCover from "../components/ProjectCover";
import classNames from 'classnames';

const Overview = () => {
  const { projectStore } = useStores();


  return (
    <div className={classNames(stylesLayout.layout, style.sectionGrid)} >
      <section className={style.allWorks}>    
        <h3>All works</h3>
        <ul className={style.overview}>
          {projectStore.projects.map((project, key)=><ProjectCover project={project} key={key}/>)}
        </ul>
      </section>
    </div>

  );
};

export default observer(Overview);
