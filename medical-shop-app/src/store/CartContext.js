import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

const fetchCartData = async () => {
    try{
        const response = await fetch('https://crudcrud.com/api/51b9b039f31c4e43b0cbc931606e2b04/cart');
        const data = await response.json();
        if(data) {
            setCart(data || []);
        }
    } catch(error) {
        console.log(error);
    }
}

const postDataOnServer = async (product) => {
    try{
        const response = await fetch('https://crudcrud.com/api/51b9b039f31c4e43b0cbc931606e2b04/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        const data = await response.json();
    } catch(error) {
        console.log(error);
    }
}

return (
    <CartProvider value={{postDataOnServer, fetchCartData}}>
        {children}
    </CartProvider>
)
}

export { CartContext, CartProvider}