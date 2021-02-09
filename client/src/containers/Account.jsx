import React, { useState } from "react";
import { observer } from "mobx-react-lite"
import withAuthentication from "../components/auth/WithAuthentication";
import ProjectCover from "../components/ProjectCover";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Account.module.css";
import Prompt from '../components/Prompt';
import cx from 'classnames';
import { useHistory } from "react-router-dom";
import ROUTES from "../constants";
import NewProject from "../components/NewProject";

const Account = () => {
  const { uiStore, projectStore } = useStores();
  const history = useHistory();
  const { name, surname, profileUrl, role } = uiStore.authUser;
  const [ page, setPage ] = useState(`newwork`);
  const [ promptMessage, setPrompt ] = useState();
  let roleClass = null;
  let roleTitle = `Visitor`;
  if(role!==`user`){
    roleClass = role===`student`? style.studentClass : style.adminClass
    roleTitle = role===`student`?`Student`:`Admin`
  }

  const handleDeleteProject = (project) => {
    setPrompt({message: `Are you sure you want to delete this work?`, primary: {title: `Yes`, action: ()=>projectStore.deleteProject(project)}, secondary: {title: `No`, action: ()=>setPrompt()}});
  }

  const ProjectEdit = ({project}) => {
    const { id, user:{name, surname, email}, title, subject, study, slug} = project;
    return (
      <li className={style.projectEdit}>
        <div className={cx(style.infoFlex, style.titleName)}>
          <h4>{`${name} ${surname}, ${title}`}</h4>
          <span>{email}</span>
        </div>
        <div className={cx(style.infoFlex, style.studySubject)}>
          <span>{study.title}</span>
          <span>{`- ${subject.title}`}</span>
        </div>
        <div className={style.editDelete}>
          <img alt={`Edit icon`} src={`/assets/img/icons/edit.svg`} onClick={()=>history.push(ROUTES.projectDetail.to+slug)} />
          <img alt={`Delete icon`} src={`/assets/img/icons/delete.svg`} onClick={()=>handleDeleteProject(project)} />
        </div>
      </li>
    );
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
          <div className={cx(style.navButton, page===`manageworks`||page===`newwork`? style.active :null )} onClick={()=>setPage(`manageworks`)}>
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
          {projectStore.projects.filter((item)=>uiStore.savedWorks.indexOf(item.id)!==-1).map((project,key)=><ProjectCover project={project} key={project.id} />)}
        </ul>
      :page===`manageworks`?
      <section className={style.manageWorks}>
        <span className={style.newProject} onClick={()=>setPage(`newwork`)}>+ new project</span>
        {getDistinctStudies(projectStore.projects).map((study)=>{
          return (
            <div className={style.studyEdit} key={study.id}>
              <h3>{study.title}</h3>
              <ul className={style.editList}>
                {projectStore.projects.filter((item)=>item.study===study).map((project,key)=><ProjectEdit project={project} key={project.id} />)}
              </ul>
            </div>
          );
        })}
      </section>  
      :page===`newwork`?
      <section className={style.manageWorks}>
        <h3 className={style.newTitle}>New project</h3>
        <NewProject />
      </section>  
      :null}
      {promptMessage?<Prompt object={promptMessage}/>:null}
    </section>
  );
};

export default (withAuthentication(observer(Account)));

const getDistinctStudies = (array) => {
  const result = [];
  const map = new Map();
  for (const item of array.map((i)=>i.study)) {
      if(!map.has(item.id)){
        map.set(item.id, true);
        result.push(item);
      }
  }
  return result;
}