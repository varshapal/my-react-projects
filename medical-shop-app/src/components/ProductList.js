// ProductList.js
import React, { useContext, useEffect, useState } from "react";
import { useProductContext } from "../store/FormContext";
import classes from "./ProductList.module.css";
import Card from "./Card";
import { ProductsContext } from "../store/ProductsContext";
import { CartContext } from "../store/CartContext";

const ProductList = () => {
  const productCtx = useContext(ProductsContext);
  const cartCtx = useContext(CartContext);
  const { products = [], addToCart, addToCartModal } = useProductContext();
  //console.log("Products:", products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = productCtx.fetchProducts();
    console.log(product);
  },[]);

  
  const quantityChangeHandler = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const addToCartHandler = (product) => {
    cartCtx.postDataOnServer(product);
    addToCart();
    addToCartModal({ ...product, quantity }); // Include quantity in addToCartModal
    setQuantity(1); //
  };

  // const addToCartHandler = (product, quantity) => {
  //   addToCart();
  //   addToCartModal(product, quantity);
  //   console.log(product);
  // };

  return (
    <Card>
      <div className={classes.list}>
        <h2>Product List</h2>
        <ul>
          {productCtx.product.map((product, index) => (
            <li key={index}>
              <strong>Name:</strong> {product.name},{" "}
              <strong>Description:</strong> {product.description},
              <strong>Price:</strong> {product.price},
              <strong>
                Amount:{" "}
                <input
                  type="number"
                  value={quantity} readOnly
                  onChange={quantityChangeHandler}
                />
              </strong>
              <button onClick={() => addToCartHandler(product)}>
                Add To Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ProductList;
