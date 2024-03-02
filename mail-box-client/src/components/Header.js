import { Button, Container, Nav, Navbar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useHistory } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
  }
    return(
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">Mail Box Client</Navbar.Brand>
          <Nav className="justify-content-center gap-3">
            
            {/* <Link to="/inbox">Inbox</Link> */}
            {isAuth && <Button variant="info" onClick={logoutHandler}>Logout</Button>}
          </Nav>
        </Container>
      </Navbar>

        
    )
};

export default Header;