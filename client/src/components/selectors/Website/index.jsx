import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { WebsiteSettings } from './WebsiteSettings';
import styled from 'styled-components';
const YoutubeDiv = styled.div`
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
  }
  iframe {
    pointer-events: ${(props) => (props.enabled ? `none` : `auto`)};
    width:100%!important;
    height:100%!important;
  }
`;

export const Website = (props) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { url } = props;

  return (
    <YoutubeDiv ref={connect} enabled={enabled}>
      <iframe title={`Inline ${url}`} allowFullScreen={false} loading={`lazy`} src={url} referrerPolicy={`origin`}/>
    </YoutubeDiv>
  );
};

Website.craft = {
  displayName: `Website`,
  props: {
    url: `https://www.google.com/`,
  },
  related: {
    toolbar: WebsiteSettings,
  },
};
