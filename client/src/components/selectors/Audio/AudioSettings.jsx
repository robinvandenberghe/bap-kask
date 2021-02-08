import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';

export const AudioSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="Audio"
        props={[`audioSrc`]}
      >
        <ToolbarItem full propKey="audioSrc" type="audio" label="Image" />
      </ToolbarSection>
      <ToolbarSection
        title="Colors"
        props={[`color`]}
        summary={({ color }) =><div style={{background: color && `rgba(${Object.values(color)})`, width: `100%`, height: `100%`, display: `block`}}/>}
      >
        <ToolbarItem full propKey="color" type="color" label="Progress bar color" />
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
      <ToolbarSection title="Decoration" props={[`shadow`]}>
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
