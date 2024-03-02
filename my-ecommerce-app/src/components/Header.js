import { useContext } from "react";
import { Fragment, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import { CartContext } from "../store/CartContext";
import AuthContext from "../store/auth-context";
import classes from './Header.module.css';

const Header = (props) => {
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);

    //const isLoggedIn = authCtx.isLoggedIn;
    const cartCount = cartCtx.cartCount;
    
    const openCartHandler = () => {
        setShowCart(true);
        
    }

    const hideCartHandler = () => {
        setShowCart(false);
    }

    return(
        <Fragment>
            <Navbar fixed="top" bg="dark" expand="sm" variant="dark" className={classes.header}>
                <Container>
                    <Navbar.Brand href="/home">React Bootstarp</Navbar.Brand>
                    <Nav className="justify-content-center gap-3" >
                        <NavLink activeClassName={classes.active} to='/home'>Home</NavLink>
                        <NavLink activeClassName={classes.active} to='/about'>About</NavLink>
                        <NavLink activeClassName={classes.active} to='/login'>Login</NavLink>
                        <NavLink activeClassName={classes.active} to="/contact_us">ContactUs</NavLink>
                        <NavLink activeClassName={classes.active} to='/store'>Store</NavLink>
                        {/* <NavLink to='/product'>Product</NavLink> */}
                        
                    </Nav>
                    <Button variant="outline-primary" onClick={openCartHandler}>Cart<span><sup>{cartCount}</sup></span></Button>
                    {showCart && (<Cart  cartItems={cartCtx.cartItems} onClose={hideCartHandler}/>)}
                    
                </Container>
            </Navbar>
        </Fragment>
    )
};
export default Header;