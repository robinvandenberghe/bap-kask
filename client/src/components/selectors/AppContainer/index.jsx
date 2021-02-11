import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { AppContainerSettings } from './AppContainerSettings';
import styled from 'styled-components';
const AppDiv = styled.div`
  width: 100%;
  height: max-content;
  max-width:100%;
  flex-wrap: wrap;
  display:flex;
  > div {
    max-width:100%;
    height: auto;
  }
`;

const defaultProps = {
  flexDirection: `row`,
  padding: [`10`, `10`, `10`, `10`],
  background: { r: 243, g: 243, b: 243, a: 1 },
  color: { r: 0, g: 0, b: 0, a: 1 },
};

export const AppContainer = (props) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));
  props = {
    ...defaultProps,
    ...props,
  };
  const {
    flexDirection,
    alignItems,
    justifyContent,
    background,
    color,
    padding,
    children,
  } = props;
  return (
    <AppDiv
      ref={connect} enabled={enabled}      
      style={{
        alignItems,
        justifyContent,
        background: `rgba(${Object.values(background)})`,
        color: `rgba(${Object.values(color)})`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        flexFlow: `${flexDirection} wrap`,
      }}>
      {children}
    </AppDiv>
  );
};

AppContainer.craft = {
  displayName: `App`,
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: AppContainerSettings,
  },
};
