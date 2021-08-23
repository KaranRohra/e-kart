import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";
import { createUserAPI } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";

function Register() {
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({});
    const [data, setData] = React.useState({});
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.password.length < 6) {
            setAlert({
                type: "warning",
                message: "Password must be at least 6 characters long",
            });
            return;
        }

        const callAPI = async () => {
            const response = await createUserAPI(data);
            if (response.status === 201) {
                history.push("/login");
                return;
            } else {
                setAlert({
                    type: "danger",
                    message: "Account with this email already exists",
                });
            }
            setLoading(false);
        };
        callAPI();
        setLoading(true);
    };

    return (
        <>
            {loading ? (
                <BoxSpinner message="Creating your account..." />
            ) : (
                <BaseForm data={data} setData={setData} handleSubmit={handleSubmit} alert={alert}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setData({ ...data, first_name: e.target.value })}
                                defaultValue={data.first_name || ""}
                                placeholder="First Name"
                                name="firstName"
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setData({ ...data, last_name: e.target.value })}
                                defaultValue={data.last_name || ""}
                                placeholder="Last Name"
                                name="lastName"
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Button style={{ width: "100%" }} variant="primary" type="submit">
                        Create an account
                    </Button>
                    <p>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </BaseForm>
            )}
        </>
    );
}

export default Register;
