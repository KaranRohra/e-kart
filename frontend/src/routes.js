import ChangePassword from "components/accounts/ChangePassword";
import ForgotPassword from "components/accounts/ForgotPassword";
import Login from "components/accounts/Login";
import Register from "components/accounts/Register";
import Header from "components/header/Header";
import Home from "components/home/Home";
import { isUserAuthenticated } from "services/apis/accounts";

const homeRoute = {
    path: "/",
    components: [<Header key="header" />, <Home key="home" />],
};

const securedRoutes = [];

const unsecuredRoutes = [
    {
        path: "/login",
        components: [<Login key="login" />],
    },
    {
        path: "/register",
        components: [<Register key="register" />],
    },
    {
        path: "/forgot-password",
        components: [<ForgotPassword key="forgot-password" />],
    },
    {
        path: "/change-password",
        components: [<ChangePassword key="change-password" />],
    },
];

const routes = [
    homeRoute,
    ...(isUserAuthenticated() ? [homeRoute] : unsecuredRoutes),
    ...(isUserAuthenticated() ? securedRoutes : [homeRoute]),
];

export default routes;
