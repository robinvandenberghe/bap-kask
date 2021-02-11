import React from 'react';
import { useEditor } from '@craftjs/core';
import style from "./Toolbar.module.css";
export * from './ToolbarItem';
export * from './ToolbarSection';
export * from './ToolbarTextInput';
export * from './ToolbarDropdown';

export const Toolbar = () => {
  const { active, related } = useEditor((state) => ({
    active: state.events.selected,
    related:
      state.events.selected && state.nodes[state.events.selected].related,
  }));

  return (
    <div>
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <div className={style.placeholderContainer}>
          <span className={style.toolbarText}>
            Click on a component to start editing.<br/>You could also double click on the layers below to edit their names, like in photoshop.
          </span>
        </div>
      )}
    </div>
  );
};
