import React from "react";
import PriceList from "../components/PriceList";
import Orders from "../components/Orders";
import styles from "./Home.module.css";
import stylesLayout from "../styles/layout.module.css";
import PageHeader from "../components/PageHeader";
import TabBar from "../components/TabBar";

const Home = () => {
  return (
    <>
      <PageHeader title={`Wat wil je bestellen?`} />
      <section className={styles.priceList}>
        <h3 className={`visually-hidden`}>Prijslijst</h3>
        <PriceList />
      </section>
      <section className={stylesLayout.content}>
        <h3 className={styles.titleMini}>Bestelling</h3>
        <Orders />
      </section>
      <TabBar></TabBar>
    </>
  );
};

export default Home;
