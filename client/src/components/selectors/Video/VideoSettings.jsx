import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';

export const VideoSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection title="Video">
      <ToolbarItem full propKey="provider" type="radio" label="Video Provider">
          <ToolbarRadio value="youtube" label="YouTube" />
          <ToolbarRadio value="vimeo" label="Vimeo" />
        </ToolbarItem>
        <ToolbarItem
          full
          propKey="videoId"
          type="text"
          label="Video ID"
        />
      </ToolbarSection>
    </React.Fragment>
  );
};
