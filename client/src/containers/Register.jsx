import React from "react";

import PageHeader from "../components/PageHeader";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";

import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <PageHeader title={`Registreren`} />
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.titleMini}>Register</h3>
        <RegisterForm />
      </section>
    </>
  );
};

export default Register;
