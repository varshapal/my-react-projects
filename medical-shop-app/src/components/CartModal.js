// CartModal.js
import React, { useContext } from "react";
import { useProductContext } from "../store/FormContext";
import Modal from "./Modal";
import { CartContext } from "../store/CartContext";

const CartModal = ({ cartItems, handleClose }) => {
  const {
    cartCount,
    addToCart,
    addToCartModal,
    removeItemFromCartHandler,
  } = useProductContext();

  

  // const quantityChangeHandler = (item, delta) => {
  //   const newQuantity = Math.max(1, item.quantity + delta);
  //   addToCartModal({...item, quantity: newQuantity});
  // }

  const quantityChangeHandler = (item) => {
    addToCartModal(item);
    addToCart();
  };

  // const quantityDecrementHandler = (item) => {
  //   removeItemFromCartHandler(item);
  // };

  const hasItems = cartCount > 0;

  const TotalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal>
      <div className="modal">
        <div className="modal-content">
          <button className="close" onClick={handleClose}>
            &times;
          </button>
          <h2>Shopping Cart</h2>
          {/* <p>Items in cart: {cartCount}</p> */}
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <strong>Name:</strong> {item.name},{" "}
                <strong>Description:</strong> {item.description},{" "}
                <strong>Price:</strong> {item.price},<strong>Quantity:</strong>{" "}
                {item.quantity}
                <button onClick={() => quantityChangeHandler(item)}>+</button>
                <button onClick={() => removeItemFromCartHandler(item)}>
                  -
                </button>
              </li>
            ))}
          </ul>
          <p>Total Amount: ${TotalAmount.toFixed(2)}</p>
          {hasItems && <button>Order</button>}
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
