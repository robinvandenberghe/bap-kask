import React from "react";

import PageHeader from "../components/PageHeader";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <PageHeader title={`Aanmelden`} />
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.titleMini}>Login</h3>
        <LoginForm />
      </section>
    </>
  );
};

export default Login;
