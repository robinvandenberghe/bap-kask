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
          <img alt={`Cover for ${title}`} src={process.env.NODE_ENV===`development`?`http://localhost:4000${coverUrl}`:coverUrl} className={style.coverImage}/>
          <h4 className={classNames(style.overlay, isActive? style.active :null)}>{user.name + ` ` + user.surname}</h4>
          <div className={style.infoContainer}>
            <span className={style.title}>{title}</span>
            <h4>{user.name + ` ` + user.surname}</h4>
          </div>
        </article>
      </NavLink>
    </div>

  );
};

export default ProjectCover;
