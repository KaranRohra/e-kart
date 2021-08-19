import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import BaseForm from "./BaseForm";

function Login() {
    const history = useHistory();

    return (
        <BaseForm>
            <Button style={{ width: "100%" }} variant="primary" onClick={() => history.push("/")}>
                Sign In
            </Button>
            <p>
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
            <p>
                Forgot password? <Link to="/forgot-password">Reset it</Link>
            </p>
        </BaseForm>
    );
}

export default Login;
