import React, { useState } from 'react';
import { Layers } from '@craftjs/layers';
import { Toolbar } from '../../Toolbar';
import { SidebarItem } from './SidebarItem';
import styled from 'styled-components';
import style from './../Viewport.module.css';
import {ReactComponent as CustomizeIcon} from './../../icons/customize.svg';
import {ReactComponent as LayerIcon} from './../../icons/layers.svg';
import { useEditor } from '@craftjs/core';

export const SidebarDiv = styled.div`
  width: ${(props) => (props.enabled ? 280 : 0)}px;
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  background: #fff;
`;

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <SidebarDiv enabled={enabled} className={style.sidebarLayout}>
        <SidebarItem
          title="Customize"
          height={!layersVisible ? `full` : `55%`}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          title="Layers"
          height={!toolbarVisible ? `full` : `45%`}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <div className="">
            <Layers expandRootOnLoad={true} />
          </div>
        </SidebarItem>
    </SidebarDiv>
  );
};
