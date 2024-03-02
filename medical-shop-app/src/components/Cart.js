import React, { useState } from "react";
import { useProductContext } from "../store/FormContext";
import CartModal from "./CartModal";
import classes from "./Cart.module.css";

const Cart = () => {
  const { cartCount, cartItems} =
    useProductContext();
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.cart}>
      {/* <h2>Shopping Cart</h2> */}
      {/* <button><p>Items in cart: {cartCount}</p></button> */}
      <button className={classes.button} onClick={openModalHandler}>
        Cart<span>{cartCount}</span>
      </button>

      {showModal && (
        <CartModal cartItems={cartItems} handleClose={closeModalHandler} />
      )}
    </div>
  );
};

export default Cart;
