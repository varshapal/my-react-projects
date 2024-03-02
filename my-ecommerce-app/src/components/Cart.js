import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./Modal";
import { Button } from "react-bootstrap";

const Cart = ({ cartItems, onClose }) => {
  const cartCtx = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

return (
  <Modal>
    <section className={classes.cart}>
    <button className="close" onClick={onClose}>
          &times;
         </button>
      
      <h2>Shopping Cart</h2>
      <ul>
          <p><strong>Title - Price - Quantity</strong></p>
          {cartItems.map((item, index) => (
             <li key={index}>
              
               <img src={item.imageUrl}  alt='flower'/> {item.title} - ${item.price}
               
               <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
               {/* <Button variant="danger">Remove</Button> */}
               {/* <button onClick={() => quantityChangeHandler(item)}>+</button>
               <button onClick={() => removeItemFromCartHandler(item)}>-</button> */}
             </li>
           ))}
         </ul>
    </section>
    </Modal>
    
);


};

export default Cart;
