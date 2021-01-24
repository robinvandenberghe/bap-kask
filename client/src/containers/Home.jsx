import React from "react";
import styles from "./Home.module.css";
import stylesLayout from "../styles/layout.module.css";
import PageHeader from "../components/PageHeader";

const Home = () => {
  return (
    <>
      <PageHeader title={`Digital Graduation Expo`} />
      <section className={styles.priceList}>
        <h3 className={`visually-hidden`}>Digital Graduation Expo</h3>
      </section>
    </>
  );
};

export default Home;
