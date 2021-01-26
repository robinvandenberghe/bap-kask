import React from "react";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.titleMini}>Login</h3>
        <LoginForm />
      </section>
    </>
  );
};

export default Login;
