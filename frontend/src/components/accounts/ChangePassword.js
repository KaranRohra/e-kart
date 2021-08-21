import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";

function ChangePassword() {
    const history = useHistory();

    return (
        <BaseForm hidePasswordField hideEmailField>
            <Form.Group className="mb-3">
                <Form.Label>Change Password</Form.Label>
                <Form.Control type="text" placeholder="Enter Password" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="text" placeholder="Enter Confirm Password" required />
            </Form.Group>
            <Button className="mb-3" style={{ width: "100%" }} variant="primary" onClick={() => history.push("/login")}>
                Change Password
            </Button>
        </BaseForm>
    );
}

export default ChangePassword;
