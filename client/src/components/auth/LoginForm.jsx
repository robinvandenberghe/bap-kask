import React, { useState } from "react";
import { inject } from "mobx-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ROUTES from "../../constants";
import stylesForm from "../../styles/form.module.css";
import TextInputField from "../TextInputField";

const LoginForm = ({ uiStore, history }) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleSubmit = e => {
    e.preventDefault();
    uiStore.login(email.toLowerCase(), password).then(() => {
      history.push(ROUTES.home);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={stylesForm.form}>
        <TextInputField  type={`email`} value={email} setValue={setEmail} name={`email`} label={`email`} />
        <TextInputField  type={`password`} value={password} setValue={setPassword} name={`password`} label={`wachtwoord`} />
        <input type="submit" value="Login" className={stylesForm.button}/>
      </form>
      <p className={stylesForm.metaAction}>
          Nog geen account? <Link to={ROUTES.register}>Registreer hier!</Link>
      </p>
    </>
  );
};

export default inject(`uiStore`)(withRouter(LoginForm));
