import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChangePassword from "./components/accounts/ChangePassword";
import ForgotPassword from "./components/accounts/ForgotPassword";
import Login from "./components/accounts/Login";
import Interest from "./components/accounts/register/Interest";
import PersonalDetails from "./components/accounts/register/PersonalDetails";
import Register from "./components/accounts/register/Register";
import NavBar from "./components/header/Header";
import Home from "./components/home/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <NavBar />
                    <Home />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/account-details" component={PersonalDetails} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/interest" component={Interest} />
            </Switch>
        </Router>
    );
}

export default App;
