import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import style  from '../Selectors.module.css';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';

export const AppContainerSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="Colors"
        props={[`background`, `color`]}
        summary={({ background, color }) => {
          return (
            <div className="flex flex-row-reverse">
              <div style={{background: background && `rgba(${Object.values(background)})`}}
                className={style.textPlaceholder}>
                <p style={{color: color && `rgba(${Object.values(color)})`}}
                  className={style.textPlaceholderText}>
                  Text
                </p>
              </div>
            </div>
          );
        }}
      >
        <ToolbarItem
          full={true}
          propKey="background"
          type="bg"
          label="Background"
        />
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
      </ToolbarSection>
      <ToolbarSection
        title="Padding"
        props={[`padding`]}
        summary={({ padding }) => {
          return `${padding[0] || 0}px ${padding[1] || 0}px ${
            padding[2] || 0
          }px ${padding[3] || 0}px`;
        }}
      >
        <ToolbarItem propKey="padding" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="padding" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="padding" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="padding" index={3} type="slider" label="Left" />
      </ToolbarSection>
      <ToolbarSection title="Alignment">
        <ToolbarItem propKey="alignItems" type="radio" label="Align Items">
          <ToolbarRadio value="flex-start" label="Flex start" />
          <ToolbarRadio value="center" label="Center" />
          <ToolbarRadio value="flex-end" label="Flex end" />
        </ToolbarItem>
        <ToolbarItem
          propKey="justifyContent"
          type="radio"
          label="Justify Content"
        >
          <ToolbarRadio value="flex-start" label="Flex start" />
          <ToolbarRadio value="center" label="Center" />
          <ToolbarRadio value="flex-end" label="Flex end" />
        </ToolbarItem>
        <ToolbarItem
          propKey="flexDirection"
          type="radio"
          label="Flex Direction"
        >
          <ToolbarRadio value="row" label="Row" />
          <ToolbarRadio value="column" label="Column" />
        </ToolbarItem>
      </ToolbarSection>
    </React.Fragment>
  );
};
