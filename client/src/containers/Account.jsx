import React, { useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Account.module.css";
import cx from 'classnames';

const Account = () => {
  const { uiStore } = useStores();
  const { name, surname, profileUrl, role } = uiStore.authUser;
  const [ page, setPage ] = useState(`works`);
  let roleClass = null;
  let roleTitle = `Bezoeker`;
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
            <span>{name + ` ` + surname}</span>
            <span className={cx(style.userRole, roleClass)}>{roleTitle}</span>
          </div>
          <div className={cx(style.subTitle, roleClass)} />
        </div>
        <div className={style.profileButtons}>
          <span className={style.editButton}>Bewerken</span>
          <span className={style.editButton} onClick={()=>uiStore.logout()}>Afmelden</span>
        </div>
      </article>
      <div className={style.pageButtons}>
        <div className={cx(style.navButton, page===`works`? style.active :null )} onClick={()=>setPage(`works`)}>
          <span>Opgeslagen werken</span>
          <div className={style.savedLabel}>
            <span>{uiStore.savedWorksLength}</span>
            <img alt={`Bladwijzer icoon`} src={`/assets/img/icons/bookmarkFill.svg`} />
          </div>
        </div>
        {role===`student`?
        <div className={cx(style.navButton, page===`mywork`? style.active :null )} onClick={()=>setPage(`mywork`)}>
          <span>Mijn werk</span>
        </div>
        :null}
        {role===`admin`?
        <div className={cx(style.navButton, page===`admin`? style.active :null )} onClick={()=>setPage(`admin`)}>
          <span>Werken beheren</span>
        </div>
        :null}
      </div>

      {page===`works`?
        <article>

        </article>
      :null}
    </section>
  );
};

export default (withAuthentication(Account));
