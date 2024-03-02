import React from "react";
import { ProductProvider } from "./store/FormContext";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { ProductsProvider } from "./store/ProductsContext";
import { CartProvider } from "./store/CartContext";



function App() {
  return (
    <ProductProvider>
      <ProductsProvider>
        <CartProvider>
      <Cart />
      <ProductForm />
      <ProductList />
      </CartProvider>
      </ProductsProvider>
    </ProductProvider>
  );
}

export default App;
