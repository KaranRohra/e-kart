import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { getUserAPI } from "services/apis/accounts";
import { Context } from "App";
import { setCookie, setUser } from "services/actions/accounts";

function LeftHeader() {
    const [loading, setLoading] = React.useState(true);
    const { state, dispatch } = React.useContext(Context);
    const history = useHistory();
    const cookies = new Cookies();

    const userIsEmpty = Object.keys(state.user).length === 0;

    React.useEffect(() => {
        const callAPI = async () => {
            const response = await getUserAPI();
            if (response.status === 200) {
                dispatch(setUser(response.data));
            }
            setLoading(false);
        };
        if (userIsEmpty) {
            callAPI();
        } else {
            setLoading(false);
        }
    }, [userIsEmpty, dispatch]);

    const handleSignOut = () => {
        cookies.remove("token");
        dispatch(setCookie({}));
        dispatch(setUser({}));
    };

    return (
        <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
            {!loading &&
                (!userIsEmpty ? (
                    <NavDropdown title={state.user.first_name}>
                        <NavDropdown.Item onClick={() => history.push("/profile")}>Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                        <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
                ))}
        </Nav>
    );
}

export default React.memo(LeftHeader);
