import React from "react";
import { inject, PropTypes, observer } from "mobx-react";
import styles from "./PriceList.module.css";

const PriceList = ({ drinkStore, orderStore }) => {
  const { drinks } = drinkStore;
  const { orderDrink } = orderStore;
  return (
    <div className={styles.priceList}>
      {drinks.length > 0 ? (
        drinks.map(drink => (
          <button
            key={drink.id}
            className={styles.item}
            onClick={() => orderDrink(drink)}
          >
            <span className={styles.itemWrapper}>
              <span className={styles.itemName}>{drink.name}</span>
              <span className={styles.itemPrice}>€ {drink.price}</span>
            </span>
            <span className={styles.itemButton}>+</span>
          </button>
        ))
      ) : (
        <p>No drinks</p>
      )}
    </div>
  );
};

PriceList.propTypes = {
  drinkStore: PropTypes.observableObject.isRequired,
  orderStore: PropTypes.observableObject.isRequired
};

export default inject(`drinkStore`, `orderStore`)(observer(PriceList));
