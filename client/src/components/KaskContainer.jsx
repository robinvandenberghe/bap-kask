import React from "react";
import style from './KaskContainer.module.css';

const KaskContainer = () => {
  return (
    <section className={style.container}>
      <div className={style.meshCanvas}>
        <div className={style.meshWaves} />
      </div>
      <div className={style.textBlock}>
        <p className={style.titleText}>KASK</p>
        <span className={style.subtitleText}><span className={style.stripe}></span>Digital Graduation Expo</span>
      </div>
      <svg>
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence id="sea-filter" numOctaves="15" seed="5" baseFrequency="1 1"></feTurbulence>
          <feDisplacementMap scale="150" in="SourceGraphic"></feDisplacementMap>
          <animate xlinkHref="#sea-filter" attributeName="baseFrequency" dur="60s" keyTimes="0;0.5;1" values="0.0005 0.0005;0.001 0.001;0.005 0.0005" repeatCount="indefinite"/>
        </filter>
      </svg>
    </section>
  );
};

export default KaskContainer;
