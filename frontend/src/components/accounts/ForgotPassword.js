import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import BaseForm from "./BaseForm";

function ForgotPassword() {
    const history = useHistory();

    return (
        <BaseForm hidePasswordField>
            <Form.Group className="mb-3">
                <Form.Label>OTP</Form.Label>
                <Form.Control type="number" placeholder="Enter OTP" required />
            </Form.Group>
            <Button className="mb-3" style={{ width: "100%" }} variant="secondary">
                Send OTP
            </Button>
            <Button style={{ width: "100%" }} variant="primary" onClick={() => history.push("/change-password")}>
                Next
            </Button>
        </BaseForm>
    );
}

export default ForgotPassword;
