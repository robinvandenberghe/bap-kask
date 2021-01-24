import React, { useState } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import ROUTES from "../../constants";
import stylesForm from "../../styles/form.module.css";
import TextInputField from "../TextInputField";

const RegisterForm = ({ uiStore, history }) => {
  const [email, setEmail] = useState(``);
  const [pwd, setPwd] = useState(``);
  const [pwd2, setPwd2] = useState(``);
  const [name, setName] = useState(``);
  const [surname, setSurname] = useState(``);

  const handleSubmit = e => {
    e.preventDefault();
    uiStore.register(name, email, pwd).then(() => {
      history.push(ROUTES.login);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={stylesForm.form}>
        <TextInputField value={name} setValue={setName} name={`name`} label={`voornaam`} />
        <TextInputField value={surname} setValue={setSurname} name={`surname`} label={`familienaam`} />
        <TextInputField  type={`email`} value={email} setValue={setEmail} name={`email`} label={`e-mailadres`} />
        <TextInputField  type={`password`} value={pwd} setValue={setPwd} name={`pwd`} label={`e-mailadres`} />
        <TextInputField  type={`password`} value={pwd2} setValue={setPwd2} name={`pwd2`} label={`e-mailadres`} />
        <input
          type="submit"
          value="Registreer"
          className={stylesForm.button}
          disabled={pwd && pwd !== pwd2}
        />
      </form>
    </>
  );
  
}

export default inject(`uiStore`)(withRouter(RegisterForm));
