import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";
import { userForgotPasswordAPI } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import queryString from "query-string";

function ResetPassword() {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});
    const [error, setError] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    const [passwordChange, setPasswordChange] = React.useState(false);
    const history = useHistory();
    const { token } = queryString.parse(useLocation().search);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.password.length < 6) {
            setError({
                password: "Password must be at least 6 characters long",
            });
            return;
        }
        if (data.password !== data.confirmPassword) {
            setError({
                confirmPassword: "Passwords do not match",
            });
            return;
        }

        setLoading(true);
        setError({});

        const callAPI = async () => {
            const response = await userForgotPasswordAPI({
                password: data.password,
                token: token,
            });
            if (response.status === 200) {
                setAlert({ type: "success", message: "Password changed successfully" });
                setData({});
                setPasswordChange(true);
            } else {
                setAlert({ type: "danger", message: "Link is invalid or expired" });
            }
            setLoading(false);
        };
        callAPI();
    };

    return (
        <>
            {loading ? (
                <BoxSpinner message="Changing password..." />
            ) : (
                <BaseForm
                    hidePasswordField={passwordChange}
                    data={data}
                    setData={setData}
                    hideEmailField
                    handleSubmit={handleSubmit}
                    alert={alert}
                >
                    {!passwordChange && (
                        <>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Change Password</Form.Label>
                                <Form.Control
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    type="password"
                                    defaultValue={data.password}
                                    placeholder="Enter Password"
                                    isInvalid={error.password}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                            </Form.Group> */}
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                    type="password"
                                    defaultValue={data.confirmPassword}
                                    placeholder="Enter Confirm Password"
                                    isInvalid={error.confirmPassword}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{error.confirmPassword}</Form.Control.Feedback>
                            </Form.Group>
                            <Button className="mb-3" style={{ width: "100%" }} variant="primary" type="submit">
                                Change Password
                            </Button>
                        </>
                    )}
                    {passwordChange && (
                        <Button style={{ width: "100%" }} variant="secondary" onClick={() => history.push("/login")}>
                            Login
                        </Button>
                    )}
                </BaseForm>
            )}
        </>
    );
}

export default ResetPassword;
