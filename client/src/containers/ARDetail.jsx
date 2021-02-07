import React from "react";
import { observer } from "mobx-react";
require(`aframe`);

const ARDetail = () => {
  return (
    <section>
      <a-scene
        embedded
        vr-mode-ui="enabled: false;"
        renderer="precision: mediump; antialias: false; alpha: true; logarithmicDepthBuffer: true; colorManagement: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        cursor="fuse: false; rayOrigin: mouse"
        raycaster="objects: .clickable"
        >
        <a-assets>
          <a-asset-item id="tree" src="/assets/models/plaat107.glb"></a-asset-item>
          <a-asset-item id="video" loop="true" src="/assets/video/testmov.mp4" webkit-playsinline autoplay={true}></a-asset-item>
        </a-assets>
        <a-marker
          type='hiro'
          size='0.2'
          id="hiroMarker"
        >
          <a-entity 
            gltf-model="#tree"
            scale="0.15 0.15 0.15"
            position="-1 0 0"
            animation-mixer
            clickhandler 
          ></a-entity>
          <a-entity 
            video="viddy"
            scale="0.25 0.25 0.25"
            position="-1 -1 0"
            playsinline
          ></a-entity> 
          <a-entity  scale="1 1 1"><a-video id="videoScreen" src="#video" width="1.6" height="0.9"></a-video></a-entity>
        </a-marker>
        <a-entity camera="userHeight: 1.6" ></a-entity>
      </a-scene>
    </section>
  );
};

export default observer(ARDetail);
