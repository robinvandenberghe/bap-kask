import React from "react";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";

import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.titleMini}>Register</h3>
        <RegisterForm />
      </section>
    </>
  );
};

export default Register;
