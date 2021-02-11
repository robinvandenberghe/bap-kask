import React from "react";
import stylesLayout from "../styles/layout.module.css";
import LoginForm from "../components/auth/LoginForm";
import KaskContainer from "../components/KaskContainer/";

const Login = () => {
  return (
    <div className={stylesLayout.gridLayout}>
      <KaskContainer/>
      <section className={`${stylesLayout.centeredContent}`}>
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
