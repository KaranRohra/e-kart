import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { getUserAPI } from "services/apis/accounts";

function LeftHeader() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const history = useHistory();
    const cookies = new Cookies();

    React.useEffect(() => {
        const callAPI = async () => {
            const response = await getUserAPI();
            if (response.status === 200) {
                setData(response.data);
            }
            setLoading(false);
        };
        callAPI();
    }, []);

    const handleSignOut = () => {
        cookies.remove("token");
        setData(null);
    };

    return (
        <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
            {!loading &&
                (data ? (
                    <NavDropdown title={data.first_name}>
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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

export default LeftHeader;
