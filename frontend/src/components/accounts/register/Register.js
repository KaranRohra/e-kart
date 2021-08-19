import React from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import BaseForm from "../BaseForm";

function Register() {
    const history = useHistory();
    return (
        <BaseForm>
            <Button style={{ width: "100%" }} variant="primary" onClick={() => history.push("/account-details")}>
                Create an account
            </Button>
            <p>
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </BaseForm>
    );
}

export default Register;
