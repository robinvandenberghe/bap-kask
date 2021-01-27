import React from "react";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";

import RegisterForm from "../components/auth/RegisterForm";
import KaskContainer from "../components/KaskContainer";

const Register = () => {
  return (
    <>
      <KaskContainer />
      <section className={`${stylesLayout.content}`}>
        <h3 className={stylesTypo.sectionTitle}>Registreren</h3>
        <RegisterForm />
      </section>
    </>
  );
};

export default Register;
