import React from "react";
import { NavLink } from 'react-router-dom';
import style from "./ProjectPreview.module.css";

const ProjectPreview = ({project}) => {
  const { id, user, title, study, coverUrl } = project;
  return (
    <NavLink to={`/project/${id}`} >
      <article className={style.container}>
        <img alt={`Cover foto voor ${title}`} src={`/assets/img/projects/${id}/${coverUrl}`} className={style.coverImage}/>
        <div className={style.infoContainer}>
          <h4>{title}</h4>
          <p>{user.name + ` ` + user.surname}</p>
        </div>
      </article>
    </NavLink>
  );
};

export default ProjectPreview;
