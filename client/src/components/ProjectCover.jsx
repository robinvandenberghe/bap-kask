import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import style from "./ProjectCover.module.css";
import classNames from 'classnames';
import ROUTES from "../constants";
import BookmarkButton from './BookmarkButton';

const ProjectCover = ({project}) => {
  const { id, user, title, coverUrl, slug } = project;
  const [ isActive, setActive ] = useState(false);

  return (
    <div className={style.wrapper} onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
      <BookmarkButton id={id} className={classNames(style.bookmarkButton, isActive? style.active :null)} />
      <NavLink to={`${ROUTES.projectDetail.to}${slug}`} >
        <article className={style.container}>
          <img alt={`Cover for ${title}`} src={`/assets/img/projects/${id}/${coverUrl}`} className={style.coverImage}/>
          <h4 className={classNames(style.overlay, isActive? style.active :null)}>{user.name + ` ` + user.surname}</h4>
        </article>
      </NavLink>
    </div>

  );
};

export default ProjectCover;
