import React, { Component } from "react";
import { PropTypes, observer } from "mobx-react";
import styles from "./AddEditDrink.module.css";
import stylesPricelist from "./PriceList.module.css";

class EditDrink extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveDrink(this.props.drink);
    this.setState({ edit: false });
  };

  render() {
    const { drink } = this.props;
    const { edit } = this.state;
    return edit ? (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={drink.name}
          onChange={e => drink.setName(e.target.value)}
        />
        <input
          type="number"
          className={styles.input}
          step="0.5"
          value={drink.price}
          onChange={e => drink.setPrice(e.target.value)}
        />
        <input type="submit" className={styles.itemButtonNoMargin} value="Save" />
      </form>
    ) : (
      <article className={styles.preview}>
        <span className={stylesPricelist.itemWrapper}>
          <span className={stylesPricelist.itemName}>{drink.name}</span>
          <span className={stylesPricelist.itemPrice}>€ {drink.price}</span>
        </span>

        <button className={stylesPricelist.itemButton} onClick={() => this.setState({ edit: true })}>Edit</button>
      </article>
    );
  }
}

EditDrink.propTypes = {
  drink: PropTypes.observableObject.isRequired
};

export default observer(EditDrink);
