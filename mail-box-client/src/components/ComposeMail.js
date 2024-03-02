import { Button, Form} from "react-bootstrap";
import classes from './ComposeMail.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/inbox-slice";




const ComposeMail = () => {
  const dispatch = useDispatch();
  
  const email = useSelector((state) => state.auth.email);
  const [emailData, setEmailData] = useState({ to: "", sub: "", msg: "" });

  const inputhandler = (e) => {
    e.preventDefault();
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const sendMailHandler = async (e) => {
    
    e.preventDefault();
    const mailData = {
      to: emailData.to,
      sub: emailData.sub,
      msg: emailData.msg,
      time: new Date().toLocaleString("default", { time: "short" }),
      sender: email,
      read: false,
      
    };
    
    const response = await fetch("https://react-project-3793d-default-rtdb.firebaseio.com/email.json",
      {
        method: "POST",
        body: JSON.stringify(mailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
   
    setEmailData({ to: "", sub: "", msg: "" });
    dispatch(inboxActions.closeComposeMail());
  };

  const closecomposeHandler = () => {
    dispatch(inboxActions.closeComposeMail());
  };
  return (
        
        <section className={classes.compose}>
        <header className={classes.header}>
        <h6>New Message</h6>
             <button onClick={closecomposeHandler}>x</button>
         </header>   
         <Form onSubmit={sendMailHandler}>
             <Form.Control type="email" name="to" value={emailData.to} placeholder="to" onChange={inputhandler}/>
             <Form.Control type="text" name="sub" value={emailData.sub} placeholder="subject" onChange={inputhandler}/>
             <Form.Control as="textarea" name="msg" value={emailData.msg} rows={3}  placeholder="message" onChange={inputhandler}/>
             <Button variant="info" type="submit">Send</Button>
            
         </Form>
         
         </section>
        



        
        
       
    
  );
};

export default ComposeMail;
