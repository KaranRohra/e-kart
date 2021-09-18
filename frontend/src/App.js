import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// ******** Components ********
import PageNotFound from "components/common/404/PageNotFound";
import reducer from "services/reducers/reducer";
import Profile from "components/accounts/Profile";
import Header from "components/header/Header";
import Home from "components/home/Home";
import ResetPassword from "components/accounts/ResetPassword";
import ForgotPassword from "components/accounts/ForgotPassword";
import Login from "components/accounts/Login";
import Register from "components/accounts/Register";
import Cart from "components/cart/Cart";

// ******** Routes ********
import PrivateRoute from "routes/PrivateRoute";
import AuthRoute from "routes/AuthRoute";

export const Context = React.createContext();

const initialState = {
    user: {},
    address: {},
    cart: {},
    products: {},
    cookies: {},
};

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    document.body.style.backgroundColor = "#f5f5f5";

    return (
        <Context.Provider value={{ state: state, dispatch: dispatch }}>
            <Router>
                <Switch>
                    {/* ******** Public Routes ********  */}
                    <Route exact path="/">
                        <Header />
                        <Home />
                    </Route>

                    {/* ******** Auth Routes ********  */}
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                    <AuthRoute exact path="/forgot-password" component={ForgotPassword} />
                    <AuthRoute exact path="/reset-password" component={ResetPassword} />

                    {/* ******** Private Routes ********  */}
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route exact path="/cart" component={Cart} />

                    {/* ******** Not Found Route ********  */}
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        </Context.Provider>
    );
}

export default App;
