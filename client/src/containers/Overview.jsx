import React from "react";
import { observer } from "mobx-react-lite"
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Overview.module.css";
import ProjectCover from "../components/ProjectCover";
import classNames from 'classnames';
import { NavLink } from "react-router-dom";
import ROUTES from "../constants";

const Overview = () => {
  const { projectStore } = useStores();

  return (
    <div className={classNames(stylesLayout.layout, style.sectionGrid, stylesLayout.scrollLayout)} >
      {projectStore.selections.slice(0,2).map((selection, index) => {
        const {user:{id, name, surname}, projects, description} = selection
        return (
          <section className={style.selection} key={index}>
            <NavLink to={ROUTES.profileDetail.to+id}><h3>{`De keuze van ${name} ${surname}`}</h3></NavLink>
            <div className={style.selectionItems}>
              <article className={style.selectionDescription}>{description}</article>
              {projects.map((p, key)=><ProjectCover project={p} key={key}/>)}
            </div>
            <img className={style.selectionRaster} alt={`raster`} src={`/assets/img/overzichtRaster.png`} />
          </section>
        );
      })}
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
