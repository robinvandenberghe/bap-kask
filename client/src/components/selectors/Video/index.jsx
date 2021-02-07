import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { VideoSettings } from './VideoSettings';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
const YoutubeDiv = styled.div`
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

  const { videoId } = props;

  return (
    <YoutubeDiv ref={connect} enabled={enabled}>
      <YouTube
        videoId={videoId}
        opts={{
          width: `100%`,
          height: `100%`,
        }}
      />
    </YoutubeDiv>
  );
};

Video.craft = {
  displayName: `Video`,
  props: {
    videoId: `jNQXAC9IVRw`,
  },
  related: {
    toolbar: VideoSettings,
  },
};
