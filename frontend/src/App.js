import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChangePassword from "components/accounts/ChangePassword";
import ForgotPassword from "components/accounts/ForgotPassword";
import Login from "components/accounts/Login";
import Register from "components/accounts/Register";
import NavBar from "components/header/Header";
import Home from "components/home/Home";

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

                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/change-password" component={ChangePassword} />
            </Switch>
        </Router>
    );
}

export default App;
