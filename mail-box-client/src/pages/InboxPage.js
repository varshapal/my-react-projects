import { Container, Row, Col, Form, Button } from "react-bootstrap";
import classes from "./InboxPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/inbox-slice";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import EmailList from "../components/EmailList";
import useFetch from "../customHooks/useFetch";


const InboxPage = () => {
  const mailId = useSelector((state) => state.auth.email);
  const totalUnreadMails = useSelector((state) => state.inbox.totalUnreadMails);
  const [data] = useFetch("https://react-project-3793d-default-rtdb.firebaseio.com/email.json");
  
  const dispatch = useDispatch();
  
  //const emails = useSelector((state) => state.inbox.emails);
  

  const [emailList, setEmailList] = useState([]);

  const composeMailHandler = () => {
    dispatch(inboxActions.openComposeMail());
  };

  //getData

  useEffect(() => {
    if(data) {

      const loadData = [];

      for (const key in data) {
        if (data[key].to === mailId) {
          loadData.push({
            id: key,
            to: data[key].to,
            sub: data[key].sub,
            msg: data[key].msg,
            time: data[key].time,
            read: data[key].read,
          });
        }
      }
      console.log("load", loadData);

      setEmailList(loadData);
      dispatch(inboxActions.saveMailData(loadData));
      
    }
  }, [data]);


  
  

  return (
    <div className={classes.inbox}>
      <Container>
        <Row className={classes.header}>
          <Col xs={2}>
            <img src="Gmail-Logo.png" alt="logo"/>
          </Col>
          <Col xs={6} className={classes.search}>
            <Form.Control
              type="text"
              placeholder="Find messages, documents, photos or people"
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={2} className={classes.leftside}>
            <Button variant="info" onClick={composeMailHandler}>
              Compose
            </Button>
            
            <div className={classes.leftoptions}>
              <div className={classes.active}>
                <div className={classes.message}>
                <div><Link to="/inbox">Inbox</Link></div>
                <div><span>{totalUnreadMails}</span></div>
                </div>
              </div>
                
                <div><Link to="/sentbox">Sent</Link></div>
              </div>
          </Col>
          <Col xs={10} className={classes.rightside}>
            {emailList.map((email) => (
              <EmailList
                key={email.id}
                id={email.id}
                to={email.to}
                sub={email.sub}
                msg={email.msg}
                time={email.time}
                read={email.read} 
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InboxPage;
