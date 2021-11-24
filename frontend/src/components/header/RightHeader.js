import { Context } from "App";
import React from "react";
import { Nav, Badge, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { isUserAuthenticated } from "services/apis/accounts";

function RightHeader() {
    const history = useHistory();
    const context = React.useContext(Context);
    const handleCart = () => {
        if (isUserAuthenticated) {
            history.push("/cart");
        } else {
            history.push("/login");
        }
    };

    return (
        <Nav>
            {isUserAuthenticated() && (
                <Nav.Link onClick={handleCart}>
                    Cart <Badge bg="secondary">{Object.keys(context.state.cart).length}</Badge>
                </Nav.Link>
            )}
            <Nav.Item className="ms-3" style={{ display: "flex" }}>
                <FormControl type="text" name="search" placeholder="Search" />

                <Button className="ms-2" type="submit" variant="outline-success">
                    Search
                </Button>
            </Nav.Item>
        </Nav>
    );
}

export default RightHeader;
