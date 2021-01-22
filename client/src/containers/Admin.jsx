import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import EditDrink from "../components/EditDrink";
import AddDrink from "../components/AddDrink";
import PageHeader from "../components/PageHeader";
import styles from "./Admin.module.css";
import TabBar from "../components/TabBar";
import withAuthentication from "../components/auth/WithAuthentication";

const Admin = ({ drinkStore }) => {
  return (
    <>
      <PageHeader title={`Administratie der dranken`} />
      <section className={styles.admin}>
        <div>
          <h3 className={styles.titleAdd}>Voeg drank toe</h3>
          <div className={styles.wrapper}>
            <AddDrink />
          </div>
        </div>
        <div>
          <h3 className={styles.titleAdd}>Lijst der dranken</h3>
          <div className={styles.wrapper}>
            {drinkStore.drinks.map(drink => (
              <EditDrink
                key={drink.id}
                drink={drink}
                saveDrink={drinkStore.updateDrink}
              />
            ))}
          </div>
        </div>
      </section>

      <TabBar />
    </>
  );
};

Admin.propTypes = {
  drinkStore: PropTypes.observableObject.isRequired
};

export default inject(`drinkStore`)(withAuthentication(observer(Admin)));
