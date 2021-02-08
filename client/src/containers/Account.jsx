import React, { useState } from "react";
import { observer } from "mobx-react-lite"
import withAuthentication from "../components/auth/WithAuthentication";
import ProjectCover from "../components/ProjectCover";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Account.module.css";
import cx from 'classnames';

const Account = () => {
  const { uiStore, projectStore } = useStores();
  const { name, surname, profileUrl, role } = uiStore.authUser;
  const [ page, setPage ] = useState(`works`);
  let roleClass = null;
  let roleTitle = `Visitor`;
  if(role!==`user`){
    roleClass = role===`student`? style.studentClass : style.adminClass
    roleTitle = role===`student`?`Student`:`Admin`
  }

  return (
    <section className={stylesLayout.layout}>
      <article className={style.pageHeader}>
        {profileUrl?
        <img className={style.profileImg} alt={`${name} ${surname}`} src={`/assets/img/users/${profileUrl}`} />
        :
        <img className={style.profileImg} alt={`${name} ${surname}`} src={`/assets/img/users/default.jpg`} />
        }
        <div className={style.titleContainer}>
          <div className={style.title}>
            <span>{name + ` ` + surname}</span>
            <span className={cx(style.userRole, roleClass)}>{roleTitle}</span>
          </div>
          <div className={cx(style.subTitle, roleClass)} />
        </div>
        <div className={style.profileButtons}>
          <span className={style.editButton}>Edit</span>
          <span className={style.editButton} onClick={()=>uiStore.logout()}>Log out</span>
        </div>
      </article>
      <div className={style.pageButtons}>
        <div className={cx(style.navButton, page===`works`? style.active :null )} onClick={()=>setPage(`works`)}>
          <span>Saved works</span>
          <div className={style.savedLabel}>
            <span>{uiStore.savedWorksLength}</span>
            <img alt={`Bookmark icon`} src={`/assets/img/icons/bookmarkFill.svg`} />
          </div>
        </div>
        {role===`student`?
        <div className={cx(style.navButton, page===`mywork`? style.active :null )} onClick={()=>setPage(`mywork`)}>
          <span>My work</span>
        </div>
        :null}
        {role===`admin`?
        <>
          <div className={cx(style.navButton, page===`manageworks`? style.active :null )} onClick={()=>setPage(`manageworks`)}>
            <span>Manage works</span>
          </div>
          <div className={cx(style.navButton, page===`manageevents`? style.active :null )} onClick={()=>setPage(`manageevents`)}>
            <span>Manage events</span>
          </div>
        </>
        :null}
      </div>

      {page===`works`?
        <ul className={style.savedWorks}>
          {projectStore.projects.filter((item)=>uiStore.savedWorks.indexOf(item.id)!==-1).map((project,key)=><ProjectCover project={project} key={key} />)}
        </ul>
      :null}
    </section>
  );
};

export default (withAuthentication(observer(Account)));
