import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext();

// const initialState = {
//     products: [],
//     cartCount: 0,
//     cartItems: [],
// }
// const cartReducer = (state, action) => {
//     switch(action.type) {
//         case 'ADD_TO_CART':
//             return {
//                 ...state,
//                 cartCount: state.cartCount + 1,
                
//                 // cartItems: [...state.cartItems, {...action.payload, id: generateId() }],
//             };

//         case 'ADD_TO_CART_MODAL':
//             return {
//                 ...state,
//                 cartItems: [...state.cartItems, action.payload]
//             }
        
//             default:
//                 return state;
//     }
// };

// const generateId = () => {
//     return Math.random().toString(36).substring(7);
// }

// const getUser = () => {

// }

const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    //const user = getUser();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('https://crudcrud.com/api/050c201584da4859aad3597e4320961d/cart');
            const data = await response.json();
            if(data) {
                setItems(data || []);
                setTotalAmount(data.totalAmount || 0);
            }
        } catch(error) {
            console.log("error", error);
        }
    }

    const updateCartOnServer = async (item) => {
        try {
            const response = await fetch('https://crudcrud.com/api/51b9b039f31c4e43b0cbc931606e2b04/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
                
            });
            const data = await response.json();
            console.error(data);
        }catch(error) {
            console.error("error", error);
            
        }
        
    }
    //const [cartState, dispatch] = useReducer(cartReducer, initialState);


// const addToCart = () => {
//     dispatch({ type: 'ADD_TO_CART'});
// }

// const addToCartModal = (product) => {
//     dispatch({type: 'ADD_TO_CART_MODAL', payload: product})
// }

return (
    <CartContext.Provider value={{ fetchCartItems, updateCartOnServer}}>
        {children}
    </CartContext.Provider>
)
};

// const useCartContext = () => {
//     return useContext(CartContext);
// };

export { CartProvider, CartContext };