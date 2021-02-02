import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Divider,
} from '@material-ui/core';
import style from "./Toolbar.module.css";
import { useNode } from '@craftjs/core';
import { makeStyles } from '@material-ui/core/styles';
const usePanelStyles = makeStyles((_) => ({
  root: {
    background: `transparent`,
    boxShadow: `none`,
    '&:before': {
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&.Mui-expanded': {
      margin: `0 0`,
      minHeight: `40px`,
      '&:before': {
        opacity: `1`,
      },
      '& + .MuiExpansionPanel-root:before ': {
        display: `block`,
      },
    },
  },
}));

const useSummaryStyles = makeStyles((_) => ({
  root: {
    'min-height': `36px`,
    padding: 0,
  },
  content: {
    margin: `0px`,
  },
}));

export const ToolbarSection = ({ title, props, summary, children }) => {
  const panelClasses = usePanelStyles({});
  const summaryClasses = useSummaryStyles({});
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res, key) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
    <ExpansionPanel classes={panelClasses}>
      <ExpansionPanelSummary classes={summaryClasses}>
        <div className={style.propGrid}>
            <h5 className={style.propTitle}>{title}</h5>
            {summary && props ? (
                <span className={style.propSummary}>
                  {summary(
                    props.reduce((acc, key) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </span>
            ) : null}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: `0px 24px 20px` }}>
        <Divider />
        <Grid container spacing={1}>
          {children}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
