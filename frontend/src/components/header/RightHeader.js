import React from "react";
import { Nav, Badge, FormControl, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { isUserAuthenticated } from "services/apis/accounts";

function RightHeader() {
    const history = useHistory();
    const handleCart = () => {
        if (isUserAuthenticated) {
            history.push("/cart");
        } else {
            history.push("/login");
        }
    };

    return (
        <Nav>
            <Nav.Link onClick={handleCart}>
                Cart <Badge bg="secondary">0</Badge>{" "}
            </Nav.Link>
            <Nav.Item className="ms-3" style={{ display: "flex" }}>
                <FormControl type="text" name="search" placeholder="Search" />

                <Button className="ms-2" type="submit" variant="outline-success">
                    Search
                </Button>
            </Nav.Item>

            <Button className="ms-2" variant="secondary">
                <Icon.BrightnessHighFill style={{ color: "white" }} />
            </Button>
        </Nav>
    );
}

export default RightHeader;
