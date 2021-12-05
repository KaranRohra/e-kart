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
import Footer from "components/common/footer/Footer";

// ******** Routes ********
import PrivateRoute from "routes/PrivateRoute";
import AuthRoute from "routes/AuthRoute";
import SingleProductView from "components/products/single-product/SingleProductView";
import Order from "components/orders/Order";
import { INIT_STATE } from "services/reducers/constants";
import { initializeState } from "init";
import { Spinner, Button } from "react-bootstrap";
import ChangePassword from "components/accounts/ChangePassword";
import ChangeEmail from "components/accounts/ChangeEmail";
import AddOrUpdateAddress from "components/accounts/AddOrUpdateAddress";
import Wishlist from "components/wishlist/Wishlist";
import ReviewOrder from "components/orders/ReviewOrder";

export const Context = React.createContext();

const initialState = {
    user: {},
    cart: {},
};

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [loading, setLoading] = React.useState(true);
    document.body.style.backgroundColor = "#f5f5f5";

    React.useEffect(() => {
        const callAPI = async () => {
            const initialState = await initializeState();
            dispatch({ type: INIT_STATE, data: initialState });
            setLoading(false);
        };
        callAPI();
    }, []);

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <Button variant="primary" disabled>
                        <Spinner className="me-2" animation="grow" size="sm" />
                        Loading...
                    </Button>
                </div>
            ) : (
                <Context.Provider value={{ state: state, dispatch: dispatch }}>
                    <Router>
                        <Switch>
                            {/* ******** Public Routes ********  */}
                            <Route exact path="/">
                                <Header />
                                <Home />
                                <Footer />
                            </Route>
                            <Route exact path="/products/:id">
                                <Header />
                                <SingleProductView />
                                <Footer />
                            </Route>
                            <Route exact path="/orders">
                                <Header />
                                <Order />
                                <Footer />
                            </Route>
                            <Route exact path="/change-password">
                                <ChangePassword />
                            </Route>
                            <Route exact path="/change-email">
                                <ChangeEmail />
                            </Route>
                            <Route exact path="/edit-address/:id">
                                <AddOrUpdateAddress />
                            </Route>
                            <Route exact path="/add-address">
                                <AddOrUpdateAddress />
                            </Route>

                            {/* ******** Auth Routes ********  */}
                            <AuthRoute exact path="/login" component={Login} />
                            <AuthRoute exact path="/register" component={Register} />
                            <AuthRoute exact path="/forgot-password" component={ForgotPassword} />
                            <AuthRoute exact path="/reset-password" component={ResetPassword} />

                            {/* ******** Private Routes ********  */}
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/wishlist" component={Wishlist} />
                            <PrivateRoute exact path="/cart" component={Cart} />
                            <PrivateRoute exact path="/review-order" component={ReviewOrder} />

                            {/* ******** Not Found Route ********  */}
                            <Route path="*" component={PageNotFound} />
                        </Switch>
                    </Router>
                </Context.Provider>
            )}
        </>
    );
}

export default App;
