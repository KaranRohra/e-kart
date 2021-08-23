import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "components/common/404/PageNotFound";
import routes from "routes";
import reducer from "services/reducers/reducer";

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

    return (
        <Context.Provider value={{ state: state, dispatch: dispatch }}>
            <Router>
                <Switch>
                    {routes.map((route, i) => (
                        <Route exact path={route.path} key={i}>
                            {route.components.map((component, j) => (
                                <React.Fragment key={j}>{component}</React.Fragment>
                            ))}
                        </Route>
                    ))}

                    <Route path="/">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </Context.Provider>
    );
}

export default App;
