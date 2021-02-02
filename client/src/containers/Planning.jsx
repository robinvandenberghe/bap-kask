import React from "react";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Planning.module.css";
import classNames from 'classnames';

const Planning = () => {
  const { projectStore } = useStores();
  return (
    <section className={stylesLayout.gridLayout} >
      <div>
        <div className={style.filterButton}>
          <img alt={`filter knop`} src={`/assets/img/icons/filter.svg`}/>
          <span>Filter</span>
        </div>    
        <ul className={style.overview}>
        </ul>
      </div>
      <div className={style.planningDetail}>

      </div>
    </section>

  );
};

export default Planning;
