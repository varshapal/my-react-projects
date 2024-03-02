
import React, { createContext, useReducer, useContext} from "react";

const ProductContext = createContext();

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
  cartCount: 0,
  cartItems: [],
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProduct = {
        id: generateProductId(),
        ...action.payload,
      };
      const updatedProducts = [...state.products, newProduct];
      //const newProduct = { ...action.payload, id: state.products.length + 1 };
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return {
        ...state,
        products: updatedProducts,
        //products: [...state.products, newProduct],
        //products: [...state.products, action.payload],
      };
      

    case "ADD_TO_CART":
      return {
        ...state,
        cartCount: state.cartCount + 1,
      };

    case "ADD_TO_CART_MODAL":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If the item is already in the cart, update its quantity
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          //cartItems: [...state.cartItems, action.payload],
          cartItems: updatedCartItems,
        };
      } else {
        
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload }],
        };
      }

    case "REMOVE":
      const existingCartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
          // If the new quantity is 1 , remove the item from the cart modal
          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== existingCartItem.id
          );

          return {
            ...state,
            cartItems: updatedCartItems,
            cartCount: state.cartCount - 1,
          };
        } else {
          // If the item is already in the cart, update its quantity
          const updatedCartItems = state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return {
            ...state,
            //cartItems: [...state.cartItems, action.payload],
            cartItems: updatedCartItems,
            cartCount: state.cartCount - 1,
          };
        }
      }
      break;
    default:
      return state;
  }
};

const generateProductId = () => {
  return `${Math.floor(Math.random() * 1000)}`;
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  

  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART" });
  };

  const addToCartModal = (product) => {
    dispatch({ type: "ADD_TO_CART_MODAL", payload: product });
  };

  const removeItemFromCartHandler = (product) => {
    dispatch({ type: "REMOVE", payload: product });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cartCount: state.cartCount,
        cartItems: state.cartItems,
        addProduct,
        addToCart,
        addToCartModal,
        removeItemFromCartHandler,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
