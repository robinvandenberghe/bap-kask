import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import style  from '../Selectors.module.css';

export const CreditsSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="Colors"
        props={[`color`]}
        summary={({ color }) => {
          return (
            <div className="flex flex-row-reverse">
              <div className={style.textPlaceholder}>
                <p style={{color: color && `rgba(${Object.values(color)})`}}
                  className={style.textPlaceholderText}>
                  Text
                </p>
              </div>
            </div>
          );
        }}
      >
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
      </ToolbarSection>
    </React.Fragment>
  );
};
