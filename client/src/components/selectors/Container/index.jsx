import React from 'react';
import { Resizer } from '../Resizer';
import { ContainerSettings } from './ContainerSettings';


const defaultProps = {
  flexDirection: `column`,
  alignItems: `flex-start`,
  justifyContent: `flex-start`,
  padding: [`0`, `0`, `0`, `0`],
  margin: [`0`, `0`, `0`, `0`],
  background: { r: 250, g: 250, b: 250, a: 1 },
  color: { r: 0, g: 0, b: 0, a: 1 },
  shadow: 0,
  radius: 0,
  width: `50%`,
  height: `125px`,
};

export const Container = (props) => {
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
    margin,
    shadow,
    radius,
    children,
  } = props;
  return (
    <Resizer
      propKey={{ width: `width`, height: `height` }}
      style={{
        justifyContent,
        display: `flex`,
        flexFlow: flexDirection + ` wrap`,
        alignItems,
        background: `rgba(${Object.values(background)})`,
        color: `rgba(${Object.values(color)})`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        boxShadow:
          shadow === 0
            ? `none`
            : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
        borderRadius: `${radius}px`,
      }}
    >
      {children}
    </Resizer>
  );
};

Container.craft = {
  displayName: `Container`,
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ContainerSettings,
  },
};
