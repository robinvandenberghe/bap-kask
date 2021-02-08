import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cx from 'classnames';
import ROUTES from "../../constants";
import style from "./Home.module.css";
import stylesLayout from "../../styles/layout.module.css";
import {AmbientLight, GLTFModel} from 'react-3d-viewer'

const Home = () => {
  const videoRef = useRef();
  const modelRef = useRef();
  const [ rotation, setRotation ] = useState({x:0, y:0, z:0});

  useEffect(()=>{
    // modelRef.current.src = `/assets/models/headerImg.glb`;
    // const element = document.createElement(`model-viewer`);
    // element.src = `/assets/models/headerImg.glb`;
    // modelRef.current.innerHTML = `
    //   <model-viewer
    //   auto-rotate 
    //   camera-controls
    //   loading="eager"
    //   class="${style.modelViewer}"
    //   src="/assets/models/headerImg.glb"
    //   >
    //   </model-viewer>`;
  })

  return (
    <>
      <section className={cx(stylesLayout.gridLayout, style.container)}>
        <video playsInline autoPlay muted loop id="bgvid" poster={`/assets/img/raster.png`} className={style.background} ref={videoRef}>
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
        <div  className={style.model}>
          <GLTFModel
            className={style.modelViewer}
            src={`/assets/models/headerImg.glb`}
            enableZoom={false}
            position={{x:-50, y: -150, z: -50}}
            >
            <AmbientLight color={0xffffff}/>
          </GLTFModel>
        </div>


      </section>
    </>
  );
};

export default Home;
