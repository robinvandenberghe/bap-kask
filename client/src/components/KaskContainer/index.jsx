import React from "react";
import style from './KaskContainer.module.css';

const KaskContainer = () => {
  return (
    <section className={style.container}>
      <div className={style.textBlock}>
        <p className={style.titleText}>KASK</p>
        <span className={style.subtitleText}><span className={style.stripe}></span>Digital Graduation Expo</span>
      </div>
    </section>
  );
};

export default KaskContainer;
