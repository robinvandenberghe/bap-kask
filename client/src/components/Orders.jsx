import React from "react";
import { PropTypes, inject, observer } from "mobx-react";

import styles from "./Orders.module.css";

const Orders = ({ orderStore }) => {
  return (
    <>
      {orderStore.orders.length > 0 ? (
        <>
          <ul className={styles.orders}>
            {orderStore.orders.map(({ drink, amount, total, decrement }) => (
              <li key={drink.id} className={styles.order}>
                <span className={styles.name}>
                  <span className={styles.amount}>{amount} x</span> {drink.name}
                </span>
                <span className={styles.price}>&euro; {total}</span>
                <button className={styles.remove} onClick={decrement}>
                  x
                </button>
              </li>
            ))}
          </ul>
          <p className={styles.total}>
            <span className={styles.totalLabel}>Totaal bedrag</span>
            <span className={styles.totalPrice}>&euro; {orderStore.total}</span>
          </p>
        </>
      ) : (
        <div className={styles.emptyState}>
          <img src="./assets/img/vat.svg" alt="Vat" />
          <span>
            Gelieve iets te bestellen{` `}
            <span role="img" aria-label="Dronken emoji">
              🤪
            </span>
          </span>
        </div>
      )}
    </>
  );
};

Orders.propTypes = {
  orderStore: PropTypes.observableObject.isRequired
};

export default inject(`orderStore`)(observer(Orders));
