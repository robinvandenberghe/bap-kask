import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import ROUTES from "../../constants";
import stylesForm from "../../styles/form.module.css";
import TextInputField from "../TextInputField";

const LoginForm = ({ history }) => {
  const { uiStore } = useStores()
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleSubmit = e => {
    e.preventDefault();
    if(!email || !password){

    }
    uiStore.login(email.toLowerCase(), password).then((r) => {
      console.log(r);
      // history.push(ROUTES.home);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={stylesForm.form}>
        <TextInputField  type={`email`} value={email} setValue={setEmail} name={`email`} label={`email`} />
        <TextInputField  type={`password`} value={password} setValue={setPassword} name={`password`} label={`wachtwoord`} />
        <input type="submit" value="Aanmelden" className={stylesForm.button}/>
        <NavLink to={ROUTES.register} className={stylesForm.secondaryButton}>Ik heb nog geen account</NavLink>
      </form>

    </>
  );
};

export default withRouter(LoginForm);
