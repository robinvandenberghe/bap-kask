import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useStores } from "../../hooks/useStores";
import ROUTES from "../../constants";
import stylesForm from "../../styles/form.module.css";
import TextInputField from "../TextInputField";
import PasswordStrengthBar from 'react-password-strength-bar';

const RegisterForm = ({  history }) => {
  const { uiStore } = useStores();
  const [email, setEmail] = useState(``);
  const [pwd, setPwd] = useState(``);
  const [pwd2, setPwd2] = useState(``);
  const [name, setName] = useState(``);
  const [surname, setSurname] = useState(``);
  const error = {
    name: `pwd`,
    message: `Wachtwoord is te kort`
  }
  const pwOptions = {
    scoreWords: [`te zwak`, `zwak`, `matig`, `goed`, `uitstekend`],
    scoreWordClassName: stylesForm.subInfo,
    minLength: 8,
    shortScoreWord: `te kort`,
    password: pwd,
    className: stylesForm.pwIndicator,
  }

  const handleSubmit = e => {
    e.preventDefault();
    const u = {id: uuidv4(), name, surname, email: email.toLowerCase(), password: pwd, role: `user`};
    uiStore.register(u).then(() => {
      history.push(ROUTES.home);
    });
  };
 
  return (
    <>
      <form onSubmit={handleSubmit} className={stylesForm.form}>
        <TextInputField value={name} setValue={setName} name={`name`} label={`voornaam`} error={error} />
        <TextInputField value={surname} setValue={setSurname} name={`surname`} label={`familienaam`} error={error} />
        <TextInputField type={`email`} value={email} setValue={setEmail} name={`email`} label={`e-mailadres`} error={error} />
        <TextInputField type={`password`} value={pwd} setValue={setPwd} name={`pwd`} label={`wachtwoord`} error={error} />
        <PasswordStrengthBar {...pwOptions}/>
        <TextInputField type={`password`} value={pwd2} setValue={setPwd2} name={`pwd2`} label={`herhaal wachtwoord`} error={error} />
        <input
          type="submit"
          value="Registreer"
          className={stylesForm.button}
          disabled={pwd && pwd !== pwd2}
        />
        <NavLink to={ROUTES.login} className={stylesForm.secondaryButton}>Ik heb al een account</NavLink>
      </form>

    </>
  );
  
}

export default withRouter(RegisterForm);
