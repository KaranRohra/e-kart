import GoBackButton from "components/common/GoBackButton";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import React from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateUserAPI } from "services/apis/accounts";

function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({});
    const [data, setData] = React.useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
        if (!data.new_password.match(passwordValidationRegex)) {
            setAlert({
                variant: "danger",
                message:
                    "New password must contain at least 8 characters, one uppercase, one lowercase and one number.",
            });
        } else {
            const response = await updateUserAPI(data);
            if (response.status === 200) {
                setAlert({
                    variant: "success",
                    message: "Password changed successfully.",
                });
            } else {
                setAlert({
                    variant: "danger",
                    message: "Wrong current password",
                });
            }
        }
        setLoading(false);
    };
    const formFields = [
        {
            name: "current_password",
            showPassword: showCurrentPassword,
            setShowPassword: setShowCurrentPassword,
            placeholder: "Current Password",
        },
        {
            name: "new_password",
            showPassword: showNewPassword,
            setShowPassword: setShowNewPassword,
            placeholder: "New Password",
        },
    ];

    return (
        <Container className="p-5 mt-5 bg-dark text-light">
            {loading ? (
                <BoxSpinner message="Updating Password...!" />
            ) : (
                <Row>
                    <Col md={{ offset: 3, span: 7 }} lg={{ offset: 4, span: 5 }} xl={{ offset: 4, span: 4 }}>
                        {alert.variant === "success" ? (
                            <GoBackButton alert={alert} url="/profile" />
                        ) : (
                            <>
                                <h3>Update Password</h3>
                                <Form className="mt-3" onSubmit={handleSubmit}>
                                    {alert.variant && <Alert variant={alert.variant}>{alert.message}</Alert>}
                                    {formFields.map((field, key) => (
                                        <React.Fragment key={key}>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.name]: e.target.value })
                                                    }
                                                    type={field.showPassword ? "text" : "password"}
                                                    placeholder={field.placeholder}
                                                    name={field.name}
                                                    defaultValue={data[field.name]}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Show Password"
                                                    onChange={() => field.setShowPassword(!field.showPassword)}
                                                />
                                            </Form.Group>
                                        </React.Fragment>
                                    ))}
                                    <Button variant="primary m-1" type="submit">
                                        Update Password
                                    </Button>
                                    <Link to="/profile" as="button" className="m-1 btn btn-danger">
                                        Cancel
                                    </Link>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default ChangePassword;
