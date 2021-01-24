
import React from "react";
import style from "./TextInput.module.css";

const TextInputField = ({ value, setValue, label, type = `text`, name }) => {

  const handleChange = e => {
    const target = e.target;
    const val = target.type === `checkbox` ? target.checked : target.value;
    setValue(val)
  };

  return (
    <label htmlFor={name}>
      {label? <span>{label}</span>: null}
      <input type={type} name={name} value={value} onChange={handleChange}  className={style.formInput}/>
    </label>
  );
};

export default TextInputField;
