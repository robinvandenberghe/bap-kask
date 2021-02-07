import React from 'react';
import { Resizer } from '../Resizer';
import { ImageSettings } from './ImageSettings';
import styled from 'styled-components';
const ImgTag = styled.img`
  width: 100%;
  height: 100%;
  max-width:100%;
`;

const defaultProps = {
  altText :`This is an image`,
  margin: [`0`, `0`, `0`, `0`],
  shadow: 0,
  radius: 0,
  width: `50%`,
  height: `200px`,
  objectFit: `cover`,
  imgSrc: `/assets/img/defaultImg.jpg`,
};

export const Image = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };
  const {
    margin,
    shadow,
    radius,
    altText,
    objectFit,
    imgSrc
  } = props;
  return (
    <Resizer
      propKey={{ width: `width`, height: `height` }}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        boxShadow:
          shadow === 0
            ? `none`
            : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
        maxWidth: `100%`,
      }}
    >
      <ImgTag 
        alt={`${altText}`} 
        style={{objectFit, borderRadius: `${radius}px`}}
        src={process.env.NODE_ENV===`development`?`http://localhost:4000${imgSrc}`:imgSrc}
      />
    </Resizer>
  );
};

Image.craft = {
  displayName: `Image`,
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ImageSettings,
  },
};
