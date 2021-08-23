import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "components/common/404/PageNotFound";
import routes from "routes";

function App() {
    // TODO Re render after sign out, solution use cookies in state
    return (
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
    );
}

export default App;
