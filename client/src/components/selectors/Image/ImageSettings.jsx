import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';

export const ImageSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="Image"
        props={[`imgSrc`]}
      >
        <ToolbarItem full propKey="imgSrc" type="image" label="Image" />
        <ToolbarItem
          propKey="objectFit"
          type="radio"
          label="Object Fit"
        >
          <ToolbarRadio value="cover" label="Cover" />
          <ToolbarRadio value="contain" label="Contain" />
        </ToolbarItem>
      </ToolbarSection> 
      <ToolbarSection
        title="Dimensions"
        props={[`width`, `height`]}
        summary={({ width, height }) => {
          return `${width || 0} x ${height || 0}`;
        }}
      >
        <ToolbarItem propKey="width" type="text" label="Width" />
        <ToolbarItem propKey="height" type="text" label="Height" />
      </ToolbarSection>
      <ToolbarSection
        title="Margin"
        props={[`margin`]}
        summary={({ margin }) => {
          return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
            margin[3] || 0
          }px`;
        }}
      >
        <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
      </ToolbarSection>
      <ToolbarSection title="Decoration" props={[`radius`, `shadow`]}>
        <ToolbarItem
          full={true}
          propKey="radius"
          type="slider"
          label="Radius"
        />
        <ToolbarItem
          full={true}
          propKey="shadow"
          type="slider"
          label="Shadow"
        />
      </ToolbarSection>
    </React.Fragment>
  );
};
