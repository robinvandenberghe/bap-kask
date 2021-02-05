import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import ROUTES from "../../constants";
import stylesForm from "../../styles/form.module.css";
import TextInputField from "../TextInputField";
import stylesTypo from "../../styles/typo.module.css";


const LoginForm = ({ history }) => {
  const { uiStore } = useStores()
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [ error, setError ] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    e.preventDefault();
    if( !email || !password ){
      if(!email){
        return setError({
          name: `email`,
          id: `EMPTY`,
          message: `Please enter your e-mail.`
        });
      }
      if(!password){
        return setError({
          name: `password`,
          id: `EMPTY`,
          message: `Please enter your password.`
        });
      }
    }else{
      uiStore.login(email.toLowerCase(), password).then((r) => {
        if(r.success){
          history.push(ROUTES.account);
        }else{
          setError(r.error);
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={stylesForm.form}>
        <h3 className={stylesTypo.sectionTitle}>Sign in</h3>
        <TextInputField  type={`email`} value={email} setValue={setEmail} name={`email`} label={`Email`} error={error} placeholder={`Enter your email address.`} setError={setError} />
        <TextInputField  type={`password`} value={password} setValue={setPassword} name={`password`} label={`Password`} placeholder={`Enter your password.`}  error={error} setError={setError} />
        <input type="submit" value="Sign in" className={stylesForm.button}/>
        <NavLink to={ROUTES.register} className={stylesForm.secondaryButton}>Create an account</NavLink>
      </form>
    </>
  );
};

export default withRouter(LoginForm);
