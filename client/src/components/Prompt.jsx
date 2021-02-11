import React from 'react';
import style from './Prompt.module.css';

const Prompt = ({object}) => {
  const {message, primary, secondary} = object;
  return (
    <div className={style.promptWrapper}>
      <div className={style.prompt}>
        <span>{message}</span>
        <div className={style.buttonFlex}>
          <span className={style.primaryButton} onClick={primary.action}>{primary.title}</span>
          <span className={style.secondaryButton} onClick={secondary.action}>{secondary.title}</span>
        </div>
      </div>
    </div>
  );
}
export default Prompt;