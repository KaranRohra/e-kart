import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";

function Register() {
    const history = useHistory();
    return (
        <BaseForm>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="First Name" />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last Name" />
                </Form.Group>
            </Row>

            <Button style={{ width: "100%" }} variant="primary" onClick={() => history.push("/login")}>
                Create an account
            </Button>
            <p>
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </BaseForm>
    );
}

export default Register;
