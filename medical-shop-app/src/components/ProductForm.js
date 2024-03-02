
import React, { useContext, useState } from "react";
import { useProductContext } from "../store/FormContext";
import classes from "./ProductForm.module.css";
import { ProductsContext } from "../store/ProductsContext";

const ProductForm = () => {
  //const { addProduct } = useProductContext();
  const productCtx = useContext(ProductsContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //addProduct(formData);
    productCtx.updateServer(formData);

    
    setFormData({ name: "", description: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
