import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isUserAuthenticated } from "services/apis/accounts";

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (!isUserAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
}

export default AuthRoute;
