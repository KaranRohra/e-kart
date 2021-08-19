import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChangePassword from "./components/accounts/ChangePassword";
import ForgotPassword from "./components/accounts/ForgotPassword";
import Login from "./components/accounts/Login";
import NavBar from "./components/header/Header";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <NavBar />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/change-password" component={ChangePassword} />
            </Switch>
        </Router>
    );
}

export default App;
