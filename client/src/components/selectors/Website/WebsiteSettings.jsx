import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';

export const WebsiteSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection title="Website">
        <ToolbarItem
          full={true}
          propKey="url"
          type="text"
          label="Website URL"
        />
      </ToolbarSection>
    </React.Fragment>
  );
};
