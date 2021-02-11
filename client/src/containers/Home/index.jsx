import React from "react";
import { NavLink } from "react-router-dom";
import cx from 'classnames';
import ROUTES from "../../constants";
import style from "./Home.module.css";
import stylesLayout from "../../styles/layout.module.css";

const Home = () => {
  return (
    <>
      <section className={cx(stylesLayout.gridLayout, style.container)}>
        <video playsInline autoPlay muted loop id="bgvid" poster={`/assets/img/raster.png`} className={style.background}>
          <source src="/assets/video/raster.webm" type="video/webm"/>
          <source src="/assets/video/raster.mp4" type="video/mp4"/>
        </video>
        <h2 className={`visually-hidden`}>Homepage</h2>
        <div className={style.infoContainer}>
          <div className={style.textBlock}>
            <p className={style.titleText}>KASK</p>
            <span className={style.subtitleText}><span className={style.stripe}></span>Digital Graduation Expo</span>
          </div>
          <NavLink to={ROUTES.overview} className={style.goToButton}>Discover the graduates</NavLink>
        </div>
        <model-viewer data-js-focus-visible rotation-per-second={`pi/16`} style={{width: `75%`, height: `80%`, alignSelf: `center`, justifySelf: `center`}} className={style.modelViewer} shadow-intensity="0" shadow-softness="0" camera-controls auto-rotate alt="A 3D model of an astronaut" src="../assets/models/headerImg.glb"></model-viewer>
      </section>
    </>
  );
};

export default Home;
