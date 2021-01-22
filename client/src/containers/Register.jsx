import React from "react";

import PageHeader from "../components/PageHeader";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import TabBar from "../components/TabBar";

import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <PageHeader title={`Register`} />
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.titleMini}>Register</h3>
        <RegisterForm />
      </section>
      <TabBar />
    </>
  );
};

export default Register;
