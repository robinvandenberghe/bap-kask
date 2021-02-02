import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useEditor } from '@craftjs/core';
import { Toolbox } from './Toolbox';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import style from './Viewport.module.css';
import {
  Button as MaterialButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
export const Viewport = ({ children }) => {
  const { enabled, connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const [loaded, setLoaded] = useState(false);
  const [mouseEnabled, setMouseEnabled] = useState(false);
  const [dialog, setDialog] = useState(false);
  
  return (
    <div
      className={cx([`viewport`], {
        loaded: loaded,
        'mouse-enabled': mouseEnabled,
      })}
    >
      <Dialog
        open={dialog}
        fullWidth={true}
        maxWidth="sm"
        onClose={() => setDialog(false)}
        disableBackdropClick={true}
      >
        <DialogTitle>{`Keep the following in mind`}</DialogTitle>
        <DialogContent>
          <ul className="px-5 list-disc" style={{ opacity: 0.85 }}>
            <li>
              Craft.js is an abstraction, this demo is an implementation of it.
              If you don't like the UI for example, please know that it is the
              demo and not the framework.
            </li>
            <li>
              This is a beta release. Bugs are to be expected. If you find one,
              please file an issue at the Github repo
            </li>
            <li>Mobile support will come in the future</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <MaterialButton
            onClick={() => setDialog(false)}
            color="primary"
            autoFocus
          >
            Okay!
          </MaterialButton>
        </DialogActions>
      </Dialog>
      <Header />
      <div>
        <Toolbox />
        <div className={cx(`craftjs-renderer`, style.layout)}>{children}</div>
        <Sidebar />
      </div>
    </div>
  );
};
