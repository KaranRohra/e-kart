import React from "react";
import { Alert, Button } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function GoBackButton(props) {
    return (
        <div className="mt-5">
            <Alert variant="success">
                {props.alert.message} <Icons.CheckCircleFill className="me-1" />
            </Alert>
            <Link to={props.url}>
                <Button variant="success" className="mt-3">
                    <Icons.ArrowLeft className="me-1" />
                    Go Back
                </Button>
            </Link>
        </div>
    );
}

export default GoBackButton;
