import React, {useState, useEffect, useRef} from "react";
import stylesLayout from '../styles/layout.module.css';
import style from './ARDetail.module.css';
import cx from 'classnames';
import {useStores} from '../hooks/useStores';
import {useHistory} from 'react-router-dom';
import ROUTES from '../constants';
import BookmarkButton from "../components/BookmarkButton";

const ARDetail = () => {
  const history = useHistory();
  const {uiStore} = useStores();
  const [overlay, setOverlay] = useState(false);
  const [visible, setVisible] = useState();
  const hiroRef = useRef();
  const customRef = useRef();

  const handleMarkerFound = (e) => {
    const item = e.target;
    setVisible({slug: item.dataset.slug, id: item.dataset.id});
  }

  const handleMarkerLost = (e) => {
    setVisible();
  }

  useEffect(()=>{
    hiroRef.current.addEventListener(`markerFound`, handleMarkerFound);
    hiroRef.current.addEventListener(`markerLost`, handleMarkerLost);
    customRef.current.addEventListener(`markerFound`, handleMarkerFound);
    customRef.current.addEventListener(`markerLost`, handleMarkerLost);
  });

  useEffect(()=>{
    return ()=>{
      if(document.querySelector(`#arjs-video`)){
        document.querySelector(`#arjs-video`).remove();
      }
    };
  },[history])

  return (
    <section className={stylesLayout.layout}>
      <div className={overlay?style.overlay:null}/>
      <div className={style.buttons}>
        <div onClick={()=>setOverlay(!overlay)} className={cx(style.overlayButton, style.topButton)}>
          {overlay?<span>Close window</span>:null}
          <img alt={`Question`} src={overlay?`/assets/img/icons/cross.svg`:`/assets/img/icons/question.svg`} />
        </div>
        {visible?
          <div className={style.bottomButtons}>
            <div onClick={()=>history.push(ROUTES.projectDetail.to+visible.slug)} className={style.overlayButton}>
              {overlay?<span>Go to this work</span>:null}
              <img alt={`Question`} src={`/assets/img/icons/website.svg`} />
            </div>
            {uiStore.authUser?
              <div onClick={()=>setOverlay(!overlay)} className={style.overlayButton}>
                {overlay?<span>Save this work</span>:null}
                <BookmarkButton id={visible.id} className={style.bookmark}/>
              </div>
            :null}
          </div>
        :null}
      </div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false;"
        renderer="precision: mediump; antialias: false; alpha: true; logarithmicDepthBuffer: true; colorManagement: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceWidth: 600; sourceHeight: 400; displayWidth: 600; displayHeight: 400; canvasWidth: 600; canvasHeight: 400;"
        cursor="fuse: false; rayOrigin: mouse"
        raycaster="objects: .clickable"
        >
        <a-assets>
          <a-asset-item id="platenspeler" src="/assets/models/Platenspeler.glb"></a-asset-item>
          <a-asset-item id="video" loop="true" src="/assets/video/testmov.mp4" webkit-playsinline ></a-asset-item>
        </a-assets>
        <a-marker
          type='hiro'
          id="hiroMarker"
          size='0.2'
          ref={hiroRef}
          emitevents
          data-slug={`megane-callewaert-fragments`}
          data-id={`8b53d09f-1935-4d00-a312-69f8524ee878`}
        >
          <a-entity 
            gltf-model="/assets/models/Platenspeler2.gltf"
            scale="0.2 0.2 0.2"
            animation-mixer
          ></a-entity>
        </a-marker>
        <a-marker
          type='pattern'
          url={`/assets/patterns/videoPattern.patt`}
          size='0.2'
          id="customMarker"
          ref={customRef}
          emitevents
          data-slug={`joren-delaere-what-a-day`}
          data-id={`0ffe245d-fc1c-498b-804c-67f1c861194d`}
        >
          <a-entity rotation='-90 0 0' ><a-video id="videoScreen" width='1.6' height='0.9' src="#video"></a-video></a-entity>
        </a-marker>
        <a-entity camera="userHeight: 1.6" ></a-entity>
      </a-scene>
    </section>
  );
};

export default ARDetail;
