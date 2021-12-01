import React from "react";
import { Form, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { userForgotPasswordAPI } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import fullLogo from "static/images/full-logo.png";
import queryString from "query-string";
import GoBackButton from "components/common/GoBackButton";

function ResetPassword() {
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState({});
    const { token } = queryString.parse(useLocation().search);

    const handleSubmit = (event) => {
        event.preventDefault();
        const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
        if (!data.password.match(passwordValidationRegex)) {
            setAlert({
                variant: "danger",
                message: "Password must contain at least 8 characters, one uppercase, one lowercase and one number.",
            });
            return;
        }
        if (data.password !== data.confirmPassword) {
            setAlert({
                variant: "danger",
                message: "Passwords does not matched",
            });
            return;
        }

        setLoading(true);

        const callAPI = async () => {
            const response = await userForgotPasswordAPI({
                password: data.password,
                token: token,
            });
            if (response.status === 200) {
                setAlert({ variant: "success", message: "Password changed successfully" });
                setData({});
            } else {
                setAlert({ variant: "danger", message: "Link is invalid or expired" });
            }
            setLoading(false);
        };
        callAPI();
    };

    const formFields = [
        {
            name: "password",
            placeholder: "Password",
        },
        {
            name: "confirmPassword",
            showPassword: showConfirmPassword,
            setShowPassword: setShowConfirmPassword,
            placeholder: "Confirm Password",
            visibleShowPassword: true,
        },
    ];

    return (
        <Container className="p-5">
            {loading ? (
                <BoxSpinner message="Updating Password...!" />
            ) : (
                <Row>
                    <Col md={{ offset: 3, span: 7 }} lg={{ offset: 4, span: 5 }} xl={{ offset: 4, span: 4 }}>
                        <Image src={fullLogo} fluid className="ps-lg-4 ms-5" />
                        {alert.variant === "success" ? (
                            <GoBackButton alert={alert} url="/login" />
                        ) : (
                            <Form className="mt-3" onSubmit={handleSubmit}>
                                {alert.variant && <Alert variant={alert.variant}>{alert.message}</Alert>}
                                {formFields.map((field, key) => (
                                    <React.Fragment key={key}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                type={field.showPassword ? "text" : "password"}
                                                placeholder={field.placeholder}
                                                name={field.name}
                                                defaultValue={data[field.name]}
                                                required
                                            />
                                        </Form.Group>
                                        {field.visibleShowPassword && (
                                            <Form.Group className="mb-3">
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Show Password"
                                                    onChange={() => field.setShowPassword(!field.showPassword)}
                                                />
                                            </Form.Group>
                                        )}
                                    </React.Fragment>
                                ))}
                                <Button variant="primary m-1" type="submit">
                                    Change Password
                                </Button>
                                <Link to="/login" as="button" className="m-1 btn btn-danger">
                                    Cancel
                                </Link>
                            </Form>
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default ResetPassword;
