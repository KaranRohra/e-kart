import ChangePassword from "components/accounts/ResetPassword";
import ForgotPassword from "components/accounts/ForgotPassword";
import Login from "components/accounts/Login";
import Register from "components/accounts/Register";
import Header from "components/header/Header";
import Home from "components/home/Home";
import { isUserAuthenticated } from "services/apis/accounts";

const homeRoute = {
    path: "/",
    components: [<Header />, <Home />],
};

const securedRoutes = [];

const unsecuredRoutes = [
    {
        path: "/login",
        components: [<Login />],
    },
    {
        path: "/register",
        components: [<Register />],
    },
    {
        path: "/forgot-password",
        components: [<ForgotPassword />],
    },
    {
        path: "/reset-password",
        components: [<ChangePassword key="reset-password" />],
    },
];

const routes = [
    homeRoute,
    ...(isUserAuthenticated() ? [homeRoute] : unsecuredRoutes),
    ...(isUserAuthenticated() ? securedRoutes : [homeRoute]),
];

export default routes;
