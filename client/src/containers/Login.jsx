import React from "react";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import LoginForm from "../components/auth/LoginForm";
import KaskContainer from "../components/KaskContainer";

const Login = () => {
  return (
    <div className={stylesLayout.gridLayout}>
      <KaskContainer/>
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.sectionTitle}>Aanmelden</h3>
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
