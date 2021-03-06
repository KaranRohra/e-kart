import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { isUserAuthenticated } from "services/apis/accounts";
import { Context } from "App";
import { EMPTY_STATE } from "services/reducers/constants";

function LeftHeader() {
    const { state, dispatch } = React.useContext(Context);
    const history = useHistory();
    const cookies = new Cookies();

    const handleSignOut = () => {
        cookies.remove("token");
        dispatch({ type: EMPTY_STATE });
        window.localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
            {isUserAuthenticated() ? (
                <NavDropdown title={state.user.first_name}>
                    <NavDropdown.Item onClick={() => history.push("/profile")}>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push("/orders")}>Orders</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push("/wishlist")}>Wishlist</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => history.push("/products/compare")}>Compare</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
                </NavDropdown>
            ) : (
                <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
            )}
        </Nav>
    );
}

export default React.memo(LeftHeader);
