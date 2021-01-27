
import React from "react";
import classNames from 'classnames';
import style from "./TextInput.module.css";

const TextInputField = ({ value, setValue, label, type = `text`, name, error = undefined }) => {
  const handleChange = e => {
    const target = e.target;
    const val = target.type === `checkbox` ? target.checked : target.value;
    setValue(val)
  };

  return (
    <label htmlFor={name} className={style.inputWrapper}>
      {label? <span>{label}</span>: null}
      <input type={type} name={name} value={value} onChange={handleChange}  className={classNames(style.formInput, error && error.name === name ?  style.errorInput : null )}/>
      {error && error.name === name ? <span className={style.errorMessage}>{error.message}</span> : null}
    </label>
  );
};

export default TextInputField;

