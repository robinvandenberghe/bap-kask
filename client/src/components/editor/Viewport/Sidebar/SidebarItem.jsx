import React from 'react';
import styled from 'styled-components';
import style from './../Viewport.module.css';

const SidebarItemDiv = styled.div`
  height: ${(props) =>
    props.visible && props.height && props.height !== `full`
      ? `${props.height}`
      : `auto`};
  flex: ${(props) =>
    props.visible && props.height && props.height === `full` ? `1` : `unset`};
  color: #545454;
`;

const HeaderDiv = styled.div`
  color: #615c5c;
  svg {
    fill: #707070;
    width:2rem;
  }
`;

export const SidebarItem = ({
  visible,
  title,
  children,
  height,
  onChange,
}) => {
  return (
    <SidebarItemDiv visible={visible} height={height} className={style.sidebarItem}>
      <HeaderDiv
        onClick={() => {
          if (onChange) onChange(!visible);
        }}
      >
        <h2 className={style.title}>{title}</h2>
      </HeaderDiv>
      {visible ? (
        <div className="w-full flex-1 overflow-auto">{children}</div>
      ) : null}
    </SidebarItemDiv>
  );
};
