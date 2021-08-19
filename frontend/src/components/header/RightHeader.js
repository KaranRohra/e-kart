import React from "react";
import { Nav, NavDropdown, Badge, FormControl, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function RightHeader() {
    return (
        <Nav>
            <Nav.Link href="">
                Cart <Badge bg="secondary">9</Badge>{" "}
            </Nav.Link>
            <NavDropdown title="More">
                <NavDropdown.Item href="/a">Action</NavDropdown.Item>
                <NavDropdown.Item href="/b">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/c">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/d">Separated link</NavDropdown.Item>
            </NavDropdown>
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
