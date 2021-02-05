import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useStores } from "../../hooks/useStores";
import ROUTES from "../../constants";
import stylesForm from "../../styles/form.module.css";
import TextInputField from "../TextInputField";
import PasswordStrengthBar from 'react-password-strength-bar';
import stylesTypo from "../../styles/typo.module.css";

const RegisterForm = ({  history }) => {
  const { uiStore } = useStores();
  const [ email, setEmail ] = useState(``);
  const [ pwd, setPwd ] = useState(``);
  const [ pwd2, setPwd2 ] = useState(``);
  const [ name, setName ] = useState(``);
  const [ surname, setSurname ] = useState(``);
  const [ error, setError ] = useState();
  const pwOptions = {
    scoreWords: [`too weak`, `weak`, `mediocre`, `good`, `excellent`],
    scoreWordClassName: stylesForm.subInfo,
    minLength: 8,
    shortScoreWord: `too short`,
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
          message: `Please enter your name.`
        });
      }
      if(!surname){
        return setError({
          name: `surname`,
          id: `EMPTY`,
          message: `Please enter your surname.`
        });
      }
      if(!email){
        return setError({
          name: `email`,
          id: `EMPTY`,
          message: `Please enter your e-mail.`
        });
      }
      if(!pwd){
        return setError({
          name: `pwd`,
          id: `EMPTY`,
          message: `Please enter your password.`
        });
      }
      if(!pwd2){
        return setError({
          name: `pwd2`,
          id: `EMPTY`,
          message: `Please repeat your password.`
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
      uiStore.register(u).then((r) => {
        if(r.success){
          history.push(ROUTES.account);
        }else{
          setError(r.error);
        }
      });
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className={stylesForm.form}>
      <h3 className={stylesTypo.sectionTitle}>Register</h3>
      <TextInputField value={name} setValue={setName} name={`name`} placeholder={`Enter your name.`} label={`Name`} error={error} setError={setError}/>
      <TextInputField value={surname} setValue={setSurname} name={`surname`} placeholder={`Enter your surname.`} label={`Surname`} error={error} setError={setError}/>
      <TextInputField type={`email`} value={email} setValue={setEmail} name={`email`} placeholder={`Enter your email address.`} label={`Email address`} error={error} setError={setError}/>
      <TextInputField type={`password`} value={pwd} setValue={setPwd} name={`pwd`} placeholder={`Enter your password.`} label={`Password`} error={error} setError={setError}/>
      <PasswordStrengthBar {...pwOptions}/>
      <TextInputField type={`password`} value={pwd2} setValue={setPwd2} name={`pwd2`} label={`Repeat password`} error={error} placeholder={`Repeat your password.`} setError={setError}/>
      <input
        type="submit"
        value="Register"
        className={stylesForm.button}
        disabled={pwd && pwd !== pwd2}
      />
      <NavLink to={ROUTES.login} className={stylesForm.secondaryButton}>I already have an account</NavLink>
    </form>
  );
  
}

export default withRouter(RegisterForm);
