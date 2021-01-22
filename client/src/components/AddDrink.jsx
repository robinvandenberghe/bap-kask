import React from "react";
import { PropTypes, inject } from "mobx-react";

import styles from "./AddEditDrink.module.css";

const AddDrink = ({ drinkStore }) => {
  const priceRef = React.createRef();
  const nameRef = React.createRef();

  const handleSubmitForm = e => {
    e.preventDefault();
    if (nameRef.current.value) {
      drinkStore.addDrink({
        name: nameRef.current.value,
        price: priceRef.current.value
      });
      nameRef.current.value = ``;
      priceRef.current.value = ``;
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className={styles.formAdd}>
      <input
        name="name"
        placeholder="Naam drank"
        defaultValue=""
        type="text"
        ref={nameRef}
        className={styles.input}
      />
      <input
        name="price"
        type="number"
        placeholder="Prijs"
        step="0.5"
        ref={priceRef}
        className={styles.input}
      />
      <button type="submit" value="Toevoegen" className={styles.button}>
        Toevoegen
      </button>
    </form>
  );
};

AddDrink.propTypes = {
  drinkStore: PropTypes.observableObject.isRequired
};

export default inject(`drinkStore`)(AddDrink);
