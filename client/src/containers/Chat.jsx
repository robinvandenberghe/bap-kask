import React from "react";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Chat.module.css";
import ProjectCover from "../components/ProjectCover";
import classNames from 'classnames';
import withAuthentication from "../components/auth/WithAuthentication";

const Chat = () => {
  const { projectStore } = useStores();
  return (
    <div className={classNames(stylesLayout.layout, style.sectionGrid)} >

      <section className={style.allWorks}>    
        <h3>Alle werken</h3>
        <ul className={style.overview}>
        </ul>
      </section>
    </div>

  );
};

export default withAuthentication(Chat);
