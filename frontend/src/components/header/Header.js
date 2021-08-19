import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

function Header() {
    const history = useHistory();

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
                    EKart
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <LeftHeader />
                    <RightHeader />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
