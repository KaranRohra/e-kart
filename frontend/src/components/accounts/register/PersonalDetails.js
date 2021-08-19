import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import BaseForm from "../BaseForm";

function PersonalDetails() {
    const history = useHistory();

    const details = [
        {
            label: "First Name",
            placeholder: "Enter First Name",
        },
        {
            label: "Last Name",
            placeholder: "Enter Last Name",
        },
        {
            label: "Age",
            placeholder: "Enter Age",
            type: "number",
        },
    ];

    return (
        <BaseForm hidePasswordField hideEmailField>
            {details.map((detail, index) => (
                <Form.Group className="mb-3" key={index}>
                    <Form.Label>{detail.label}</Form.Label>
                    <Form.Control type={detail.type ? detail.type : "text"} placeholder={detail.placeholder} required />
                </Form.Group>
            ))}
            <Button style={{ width: "100%" }} variant="primary" onClick={() => history.push("/interest")}>
                Next
            </Button>
        </BaseForm>
    );
}

export default PersonalDetails;
