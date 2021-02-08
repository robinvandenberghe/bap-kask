import React, { useState } from 'react';
import cx from 'classnames';
import { useEditor, Frame } from '@craftjs/core';
import { Toolbox } from './Toolbox';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import style from './Viewport.module.css';

export const Viewport = ({ children, object }) => {
  const [loaded, setLoaded] = useState(false);
  const [mouseEnabled, setMouseEnabled] = useState(false);
  const { actions: {deserialize}} = useEditor();

  return (
    <div
      className={cx([`viewport`], {
        loaded: loaded,
        'mouse-enabled': mouseEnabled,
      })}
      onLoad={()=>setLoaded(true)}
    >
      <Header object={object} />
      <div>
        <Toolbox />
        <div className={cx(`craftjs-renderer`, style.layout)}>
          {children}
          <Frame data={loaded&&object.json?deserialize(object.json):undefined}>
            {object.template}
          </Frame>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
