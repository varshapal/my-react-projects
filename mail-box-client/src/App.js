import { useSelector } from "react-redux";

import Auth from "./components/Auth";

import { Route, Switch } from "react-router-dom";

import ComposeMail from "./components/ComposeMail";

import InboxPage from "./pages/InboxPage";
import EmailDetail from "./components/EmailDetail";
import SentBox from "./pages/SentBox";

import Header from "./components/Header";
//import SentEmailDetail from "./Pages/SentEmailDetail";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isComposemail = useSelector((state) => state.inbox.isComposemail);

  return (
    <div>
      <Header />
      {isComposemail && <ComposeMail />}

      <Switch>
        <Route path="/" exact>
          {!isAuth && <Auth />}
        </Route>

        <Route path="/inbox">
          {isAuth && <InboxPage />}
        </Route>

        <Route path="/emaildetail">
          <EmailDetail />
        </Route>

        {/* <Route path="/sentemaildetail">
          <SentEmailDetail />
        </Route> */}

        <Route path="/sentbox">
          <SentBox />
        </Route>

        
      </Switch>
    </div>
  );
}

export default App;
