import React from "react";
import styles from "./Home.module.css";
import stylesLayout from "../styles/layout.module.css";
import PageHeader from "../components/PageHeader";
import { inject } from "mobx-react";

const Home = ({uiStore}) => {
  return (
    <>
      <PageHeader title={`Digital Graduation Expo - ${uiStore.authUser.name}`} />
      <section className={styles.priceList}>
        <h3 className={`visually-hidden`}>Digital Graduation Expo - {uiStore.authUser.name}</h3>
      </section>
    </>
  );
};

export default inject(`uiStore`)(Home);
