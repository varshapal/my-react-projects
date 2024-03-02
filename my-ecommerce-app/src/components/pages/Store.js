
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import classes from './Store.module.css';

import { useContext } from 'react';
import Header from '../Header';
import { CartContext } from '../../store/CartContext';



const Store = (props) => {
  const cartCtx = useContext(CartContext);

    const products = [
        {
          title: "Colors",
          price: 100,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
        },
        {
          title: "Black and white Colors",
          price: 50,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
        },
        {
          title: "Yellow and Black Colors",
          price: 70,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
        },
        {
          title: "Blue Color",
          price: 100,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
        },
      ];
    

      
        const cartHandler = (item) => {
          
            //cartCtx.addToCart();
            //cartCtx.addToCartModal(product);
            // cartCtx.fetchCartItems();
            
              //props.onAddProduct(product);
            
            cartCtx.updateCartOnServer(item);
        };



    return(
        <>
            
            <div className={classes.store}>
                <h1>The Generics</h1>
            </div>
            
            <div>
                <Container>
                    <h1 className='text-center'>Music</h1>
                    <Row>
                        {products.map((item, index) => (
                            <Col key={index} md={6} className='d-flex justify-content-center'>
                                <Card  border='light' style={{width: '18rem'}}>
                                    <Link to='/store/{item}'><Card.Title>{item.title}</Card.Title>
                                    <img src={item.imageUrl}  alt='flower'/></Link>
                                    <Card.Body>
                                        <Card.Text>Rs. {item.price}</Card.Text>
                                        <Button onClick={() => cartHandler(item)}>Add To Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                        
                    </Row>

                    <div className="container my-md-3">
          <div className="row">
            <div className="col text-center">
              <Button onClick={cartHandler}>See the Cart</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
                
            
        </>
    )
};

export default Store;