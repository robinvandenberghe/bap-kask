import React, {useState, useEffect} from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import cx from 'classnames';
import { useStores } from "../hooks/useStores";
import style from './ProfileDetail.module.css';
import stylesLayout from '../styles/layout.module.css';
import ProjectCover from '../components/ProjectCover';

const ProfileDetail = () => {
  const {id} = useParams();
  const {uiStore, projectStore} = useStores();
  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState();

  useEffect(()=>{
    const init = async () => {
      if(!user){
        const r = await uiStore.getUser(id);
        if(r&&r.name){
          setLoading(false);
          setUser(r);
        }
      }
    } 
    init();
  });

  if(user && !loading){
    const {name, surname, email, role, profileUrl, savedWorks: savedWorksRaw} = user;
    const savedWorks = savedWorksRaw.map(i=>i.projectId);
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
          <img className={style.profileImg} alt={`Profielfoto van ${name} ${surname}`} src={`/assets/img/users/${profileUrl}`} />
          :
          <img className={style.profileImg} alt={`Profielfoto van ${name} ${surname}`} src={`/assets/img/users/default.jpg`} />
          }
          <div className={style.titleContainer}>
            <div className={style.title}>
              <div className={style.nameEmail}>
                <span>{name + ` ` + surname}</span>
                {role!==`user`?<span className={style.email}>{email}</span>:null}
              </div>
              <span className={cx(style.userRole, roleClass)}>{roleTitle}</span>
            </div>
            <div className={cx(style.subTitle, roleClass)} />
          </div>
        </article>
        <div className={style.pageButtons}>
          <div className={cx(style.navButton, style.active)}>
            <span>Saved works</span>
            <div className={style.savedLabel}>
              <span>{savedWorks.length}</span>
              <img alt={`Bookmark icon`} src={`/assets/img/icons/bookmarkFill.svg`} />
            </div>
          </div>
        </div>
        <ul className={style.savedWorks}>
          {projectStore.projects.filter((item)=>savedWorks.indexOf(item.id)!==-1).map((project,key)=><ProjectCover project={project} key={key} />)}
        </ul>
      </section>
    );
  }
  return (
    <section className={stylesLayout.layout}>
      <div className={style.loadingContainer}>
        <h3>Loading user...</h3>
        <img alt={`Loading animation`} src={`/assets/img/loading.svg`} />
      </div>
    </section>
  );

};

export default observer(ProfileDetail);
