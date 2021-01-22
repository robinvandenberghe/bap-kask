import React from "react";

import PageHeader from "../components/PageHeader";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import TabBar from "../components/TabBar";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <PageHeader title={`Sign In`} />
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.titleMini}>Login</h3>
        <LoginForm />
      </section>
      <TabBar />
    </>
  );
};

export default Login;
