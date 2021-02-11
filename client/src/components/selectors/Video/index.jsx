import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { VideoSettings } from './VideoSettings';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
const VideoDiv = styled.div`
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
    width:100%;
  }
  iframe {
    pointer-events: ${(props) => (props.enabled ? `none` : `auto`)};
    width:100%!important;
    height:100%!important;
  }
`;

export const Video = (props) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));
  const { videoId, provider } = props;
  return (
    <VideoDiv ref={connect} enabled={enabled}>
      {provider===`youtube`?
        <YouTube
          videoId={videoId}
          opts={{
            width: `100%`,
            height: `100%`,
          }}
        />
      :provider===`vimeo`?
        <Vimeo video={videoId} />
      :null}

    </VideoDiv>
  );
};

Video.craft = {
  displayName: `Video`,
  props: {
    provider: `youtube`,
    videoId: `jNQXAC9IVRw`,
  },
  related: {
    toolbar: VideoSettings,
  },
};
