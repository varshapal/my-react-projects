import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/pages/About";
import Store from "./components/pages/Store";
import { CartProvider } from "./store/CartContext";
import Home from './components/pages/Home';
import ContactUs from './components/pages/ContactUs';

import ProductDetail from './components/pages/ProductDetail';
import Login from './components/pages/Login';
import AuthContext from './store/auth-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



// const router = createBrowserRouter([
//   { path: '/', element: <Home />},
//   { path: '/about', element: <About />},
//   { path: '/store', element: <Store />},
// ])

async function addUserHandler(user) {
  const respone = await fetch("https://react-http-9242d-default-rtdb.firebaseio.com/customers.json", {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await respone.json();
  console.log(data);
}


function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    //<RouterProvider router={router}>
      <CartProvider>
      <Header />
      <main>
      <Switch>
      <Route exact path='/'>
        <Redirect to='/home' />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/contact_us'>
      <ContactUs  onAddUser={addUserHandler}/>
      </Route>
      <Route path='/store' exact>
      {authCtx.isLoggedIn && <Store />}
      {!authCtx.isLoggedIn && <Redirect to='/login' />}
      
      </Route>
      
      {/* <Route path='/product/:productId'>
      <Store />
      </Route> */}
      <Route path='/store/:productId'>
      <ProductDetail />
      </Route>
      </Switch>
      </main>
      {/* <Cart data={products}/> */}
    <Footer />
    </CartProvider>
    //</RouterProvider>
    
  );
}

export default App;
