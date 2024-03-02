import { authActions } from "../store/auth-slice";
 import { Link} from 'react-router-dom';
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthentication);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
  };
  return (
    <header className={classes.header}>
      <h1>Expense Tracker</h1>
      <Link to="/expense">Expenses</Link>
      {isAuth && <button onClick={logoutHandler}>Logout</button>}
    </header>
  );
};

export default Header;
