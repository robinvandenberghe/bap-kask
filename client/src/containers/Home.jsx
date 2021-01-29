import React from "react";
import KaskContainer from "../components/KaskContainer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <section className={styles.container}>
        <h3 className={`visually-hidden`}>Homepage</h3>
        <KaskContainer />
      </section>
    </>
  );
};

export default Home;
