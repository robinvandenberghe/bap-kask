import React, { useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Account.module.css";
import cx from 'classnames';

const Account = () => {
  const { uiStore } = useStores();
  const { name, surname, profileUrl, role } = uiStore.authUser;
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
            <span className={style.userRole}>{roleTitle}</span>
          </div>
          <div className={cx(style.subTitle, roleClass)} />
        </div>
      </article>
    </section>
  );
};

export default (withAuthentication(Account));
