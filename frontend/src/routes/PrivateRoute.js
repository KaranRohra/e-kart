import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isUserAuthenticated } from "services/apis/accounts";

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (isUserAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
}

export default PrivateRoute;
