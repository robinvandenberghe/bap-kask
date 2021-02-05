import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import style from "./ProjectCover.module.css";
import classNames from 'classnames';
import ROUTES from "../constants";

const ProjectCover = ({project}) => {
  const { id, user, title, coverUrl, slug } = project;
  const [ isActive, setActive ] = useState(false);
  return (
    <NavLink to={`${ROUTES.projectDetail.to}${slug}`} >
      <article className={style.container} onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
        <img alt={`Cover foto voor ${title}`} src={`/assets/img/projects/${id}/${coverUrl}`} className={style.coverImage}/>
          <div className={classNames(style.overlay, isActive? style.active :null)}>
            <h4>{user.name + ` ` + user.surname}</h4>
          </div>
      </article>
    </NavLink>
  );
};

export default ProjectCover;
