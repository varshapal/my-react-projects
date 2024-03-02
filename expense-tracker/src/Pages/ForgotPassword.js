import { useState } from "react";
import classes from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const sendLinkHandler = async (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBL0Dxkr3qq-HpRREjZfDFI5--szzAAycs', {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: `${email}`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log("data",data);
    }
    return(
        <section className={classes.password}>
        <form onSubmit={sendLinkHandler}>
            <label>
                Enter email with which you have registered
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}required/> 
            </label>
            <button type="submit">Send Link</button>
        </form>
        </section>
    )
};

export default ForgotPassword;