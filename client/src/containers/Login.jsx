import React from "react";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import LoginForm from "../components/auth/LoginForm";
import KaskContainer from "../components/KaskContainer";

const Login = () => {
  return (
    <>
      <KaskContainer/>
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.sectionTitle}>Aanmelden</h3>
        <LoginForm />
      </section>
    </>
  );
};

export default Login;
