import React from "react";
import style from "./KaskContainer.module.css";

const KaskContainer = () => {
  return (
    <div className={style.container}>
      {/* <Lottie /> */}
      <div className={style.textBlock}>
        <p className={style.titleText}>KASK</p>
        <span className={style.subtitleText}><span className={style.stripe}></span>Digital Graduation Expo</span>

      </div>
    </div>
  );
};

export default KaskContainer;
