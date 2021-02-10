import React from "react";
import stylesLayout from '../styles/layout.module.css';

const ARDetail = () => {
  return (
    <section className={stylesLayout.layout} style={{overflow: `hidden`}}>
      <a-scene
        embedded
        vr-mode-ui="enabled: false;"
        renderer="precision: mediump; antialias: false; alpha: true; logarithmicDepthBuffer: true; colorManagement: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        cursor="fuse: false; rayOrigin: mouse"
        raycaster="objects: .clickable"
        style={{width: `100%`, height:`100%`}}
        >
        <a-assets>
          <a-asset-item id="tree" src="/assets/models/plaat107.glb"></a-asset-item>
          <a-asset-item id="video" loop="true" src="/assets/video/testmov.mp4" webkit-playsinline></a-asset-item>
        </a-assets>
        <a-marker
          type='hiro'
          size='0.2'
          id="hiroMarker"
        >
          <a-entity 
            gltf-model="#tree"
            scale="0.15 0.15 0.15"
            position="0 0 0"
            animation-mixer
            clickhandler 
          ></a-entity>
          {/* <a-entity  scale="1 1 1"><a-video id="videoScreen" src="#video" width="1.6" height="0.9"></a-video></a-entity> */}
        </a-marker>
        <a-entity style={{position: `relative`, width: `100%`, height:`100%`}} camera="userHeight: 1.6" ></a-entity>
      </a-scene>
    </section>
  );
};

export default ARDetail;
