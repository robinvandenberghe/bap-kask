import React from "react";
import stylesLayout from "../styles/layout.module.css";
import RegisterForm from "../components/auth/RegisterForm";
import KaskContainer from "../components/KaskContainer/";

const Register = () => {
  return (
    <div className={stylesLayout.gridLayout}>
      <KaskContainer />
      <section className={`${stylesLayout.centeredContent}`}>
        <RegisterForm />
      </section>
    </div>
  );
};

export default Register;
