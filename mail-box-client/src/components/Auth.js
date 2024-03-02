import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import classes from './Auth.module.css';
import { useRef, useState } from "react";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [isSignupScreen, setIsSignupScreen] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const toggleScreenHandler = () => {
        setIsSignupScreen((isSignupScreen) => !isSignupScreen);
    }


    const submitHandler = async(e) => {
        e.preventDefault();

        const eneteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        if(isSignupScreen) {
            const enteredConfirmPassword = confirmPasswordInputRef.current.value;
            if(enteredPassword !== enteredConfirmPassword) {
                alert('Password not match');
            }
        }
        

        
        
        let url ;
        if(!isSignupScreen) {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlv4j8AKAZRNPVQjWqkyGU06wjaG_dvQQ';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlv4j8AKAZRNPVQjWqkyGU06wjaG_dvQQ';
        }
        fetch(url, {
            method: 'Post',
            body: JSON.stringify({
                email: eneteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication Failed';

                    throw new Error(errorMessage);
                }) 
            }
        }).then((data) => {
            console.log(data);
            if(isSignupScreen) {
                console.log('Successfully Register');
            }
            dispatch(authActions.isLogin(data.idToken));
            dispatch(authActions.getEmailId(data.email));
            
            
            
            history.push('/inbox');

            

        }).catch((error) => {
            alert(error.message);
        })
    }
    return(
        <section className={classes.auth}>
        <Container className="justify-content-center align-items-center text-center">
            <Row>
                <Col xs={5}>
                    <Card>
                        <Card.Header>
                            <h3>{isSignupScreen ? 'SignUp' : 'Login'}</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="email" required ref={emailInputRef}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control  type="password" placeholder="password" required ref={passwordInputRef}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    {isSignupScreen && <Form.Control type="password" placeholder="confirm password" required ref={confirmPasswordInputRef}/>}
                                </Form.Group>
                                <Form.Group className="mb-3 d-grid" >
                                    <Button variant="info"  type="submit">{isSignupScreen ? 'Sign up' : 'Login'}</Button>
                                </Form.Group>
                                {/* <Form.Group>
                                    {!isSignupScreen && <Button variant="link">Forgot password</Button>}
                                </Form.Group> */}
                            </Form>
                            <Button variant="secondary" onClick={toggleScreenHandler}>{isSignupScreen ? 'Have an account? Login' : 'Dont have an account? signup'}</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </section>
    )
};

export default Auth;