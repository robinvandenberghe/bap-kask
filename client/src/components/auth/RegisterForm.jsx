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
  const [ email, setEmail ] = useState(``);
  const [ pwd, setPwd ] = useState(``);
  const [ pwd2, setPwd2 ] = useState(``);
  const [ name, setName ] = useState(``);
  const [ surname, setSurname ] = useState(``);
  const [ error, setError ] = useState();
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
    if(!name || !surname || !email || !pwd || !pwd2 || pwd.length<8 || pwd!==pwd2){
      if(!name){
        return setError({
          name: `name`,
          id: `EMPTY`,
          message: `Vul uw voornaam in.`
        });
      }
      if(!surname){
        return setError({
          name: `surname`,
          id: `EMPTY`,
          message: `Vul uw familienaam in.`
        });
      }
      if(!email){
        return setError({
          name: `email`,
          id: `EMPTY`,
          message: `Vul uw e-mailadres in.`
        });
      }
      if(!pwd){
        return setError({
          name: `pwd`,
          id: `EMPTY`,
          message: `Vul uw wachtwoord in.`
        });
      }
      if(!pwd2){
        return setError({
          name: `pwd2`,
          id: `EMPTY`,
          message: `Herhaal uw wachtwoord.`
        });
      }
      if(pwd.length<8){
        return setError({
          name: `name`,
          id: `LENGTH`,
          message: `Uw wachtwoord is niet lang genoeg. Het moet minstens 8 karakters bevatten.`
        });
      }
      if(pwd!==pwd2){
        return setError({
          name: `pwd2`,
          id: `NO_MATCH`,
          message: `Wacthwoorden komen niet overeen.`
        });
      }
    }else{
      const u = {id: uuidv4(), name, surname, email: email.toLowerCase(), password: pwd, role: `user`};
      uiStore.register(u).then(() => {
        history.push(ROUTES.home);
      });
    }
  };
 
  return (
    <>
      <form onSubmit={handleSubmit} className={stylesForm.form}>
        <TextInputField value={name} setValue={setName} name={`name`} label={`voornaam`} error={error} setError={setError}/>
        <TextInputField value={surname} setValue={setSurname} name={`surname`} label={`familienaam`} error={error} setError={setError}/>
        <TextInputField type={`email`} value={email} setValue={setEmail} name={`email`} label={`e-mailadres`} error={error} setError={setError}/>
        <TextInputField type={`password`} value={pwd} setValue={setPwd} name={`pwd`} label={`wachtwoord`} error={error} setError={setError}/>
        <PasswordStrengthBar {...pwOptions}/>
        <TextInputField type={`password`} value={pwd2} setValue={setPwd2} name={`pwd2`} label={`herhaal wachtwoord`} error={error} setError={setError}/>
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
