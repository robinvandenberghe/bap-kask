import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { CreditsSettings } from './CreditsSettings';
import { Text } from '../index';
import styled from 'styled-components';
const CreditsDiv = styled.div`
  width: max-content;
  height: max-content;
  max-width:100%;
  display:grid;
  gap: .8rem;
  align-items: center;
  justify-items: flex-start;
  border-left: solid 2px #000;
  padding: .8rem;
  > div {
    max-width:100%;
    height: auto;
  }
`;
const CreditsH5 = styled.h5`
  width: max-content;
  font-size: 1.8rem;
  font-weight: 600;

`

const defaultProps = {
  color: { r: 0, g: 0, b: 0, a: 1 },
};

export const Credits = (props) => {
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
    color,
    children,
  } = props;
  return (
    <CreditsDiv
      canvas
      ref={connect} enabled={enabled}      
      style={{
        color: `rgba(${Object.values(color)})`,
        borderColor: `rgba(${Object.values(color)})`,
      }}>
      <CreditsH5>Credits</CreditsH5>
      {children}
    </CreditsDiv>
  );
};

Credits.craft = {
  displayName: `Credits`,
  props: defaultProps,
  canDelete: false,
  rules: {
    canDrag: () => true,
    canMoveIn: (node) => node.data.type === Text,
  },
  related: {
    toolbar: CreditsSettings,
  },
};
