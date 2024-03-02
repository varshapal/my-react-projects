import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import { useSelector } from "react-redux";

import Expense from "./Pages/Expense";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthentication);
  const forgotPwd = useSelector((state) => state.auth.forgotPwd);

  return (
    <div>
      <Header />

      {forgotPwd && !isAuth && <ForgotPassword />}
      {!isAuth && !forgotPwd && <Auth />}

      <Switch>
        <Route path="/" exact>
          {isAuth && <Home />}
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/expense">{isAuth && <Expense />}</Route>
      </Switch>
    </div>
  );
}

export default App;
