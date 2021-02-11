import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { Text } from '../Text';
import { ButtonSettings } from './ButtonSettings';
import styled from 'styled-components';
import cx from 'classnames';

const StyledButton = styled.div`
  font-size: 2rem;
  padding: .4rem 1.6rem;
  background: ${(props) =>
    props.buttonStyle === `full`
      ? `rgba(${Object.values(props.background)})`
      : `transparent`};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.buttonStyle === `outline`
      ? `rgba(${Object.values(props.background)})`
      : `transparent`};
  margin: ${({ margin }) =>
    `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
    &:hover{
      cursor:pointer;
    }
`;

export const Button = (props) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode();

  const { text, textComponent, url, color, ...otherProps } = props;
  return (
    <StyledButton
      ref={connect}
      onClick={()=>!enabled&&url?window.open(url,`_blank`):null}
      className={cx([
        `rounded w-full px-4 py-2`,
        {
          'shadow-lg': props.buttonStyle === `full`,
        },
      ])}
      {...otherProps}
    >
      <Text {...textComponent} fontSize={18} text={text} color={props.color} />
    </StyledButton>
  );
};

Button.craft = {
  displayName: `Button`,
  props: {
    background: { r: 255, g: 255, b: 255, a: 1 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    buttonStyle: `full`,
    text: `Button`,
    margin: [`5`, `0`, `5`, `0`],
    textComponent: {
      ...Text.craft.props,
      textAlign: `center`,
    },
  },
  related: {
    toolbar: ButtonSettings,
  },
};
