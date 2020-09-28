import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import productScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
    <div className="grid-container">
            <div className="header">
            <div className="brand"><a href="/">Shop Kart</a></div>
                <div className="links">{userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
                    <Link to="/cart">Cart</Link>
                </div>
            </div>
            <main className="main">
                <div className="content">
                  <Route path="/signin" component={SigninScreen} />
                  <Route path="/register" component={RegisterScreen} />
                  <Route path="/product/:id" component={productScreen} />
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/" exact component={HomeScreen} />
                  </div>
                    </main>
            <footer className="footer">
                All right reserved.
            </footer>
            </div>
    </BrowserRouter>
  );
}

export default App;
