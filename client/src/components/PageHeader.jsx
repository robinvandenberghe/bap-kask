import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ROUTES from "../constants";
import style from "./PageHeader.module.css";
import cx from 'classnames';

const PageHeader = () => {
  const location = useLocation();
  return (
    <header className={style.container}>
      <NavLink to={ROUTES.home} className={style.logoWrapper}>
        <h1 >
          <img className={style.logoImage} alt='Logo KASK School of Arts' src={`/assets/img/kask-logo.png`} />
          <p className='visually-hidden'>Digital Graduation Expo - KASK School of Arts</p>
        </h1>
      </NavLink>
      <nav className={style.menu}>
        <NavLink exact to={ROUTES.home} className={cx(style.menuItem, style.textLink)} activeClassName={style.selectedMenuItem} >home</NavLink>
        <NavLink to={ROUTES.schedule} className={cx(style.menuItem, style.textLink)} activeClassName={style.selectedMenuItem} >schedule</NavLink>
        <NavLink to={ROUTES.overview} className={cx(style.menuItem, style.textLink)} activeClassName={style.selectedMenuItem} >overview</NavLink>
        <NavLink to={ROUTES.chat} className={style.menuItem} activeClassName={style.selectedMenuItem} ><img className={cx(style.menuIcon)} alt={`search icon`} src={location.pathname===ROUTES.chat?`/assets/img/icons/chatFill.svg`:`/assets/img/icons/chat.svg`} /></NavLink>
        <NavLink to={ROUTES.account} className={style.menuItem} activeClassName={style.selectedMenuItem} ><img className={style.menuIcon} alt={`account icon`} src={location.pathname===ROUTES.account?`/assets/img/icons/profileFill.svg`:`/assets/img/icons/profile.svg`} /></NavLink>
        <NavLink to={ROUTES.search} className={style.menuItem} activeClassName={style.selectedMenuItem} ><img className={style.menuIcon} alt={`search icon`} src={`/assets/img/icons/search.svg`} /></NavLink>
      </nav>
    </header>
  );
};

export default PageHeader;
