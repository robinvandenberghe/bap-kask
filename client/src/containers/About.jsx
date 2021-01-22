import React from "react";
import PageHeader from "../components/PageHeader";
import stylesLayout from "../styles/layout.module.css";
import stylesTypo from "../styles/typo.module.css";
import TabBar from "../components/TabBar";

const About = () => {
  return (
    <>
      <PageHeader title={`Over de Reisduif`} />
      <section className={stylesLayout.content}>
        <div className={stylesTypo.paragraphs}>
          <h3 className={stylesTypo.titleMini}>Excuses</h3>

          <p>Helaas was het budget op waardoor we deze pagina niet meer konden ontwikkelen.</p>
          <p>Exuses voor het ongemak.</p>
          <p>René van Café de Reisduif</p>
        </div>
      </section>

      <TabBar></TabBar>
    </>
  );
};

export default About;
