import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";
import { isUserAuthenticated, updateUserAPI } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";

function ChangePassword(props) {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});
    const [error, setError] = React.useState({});
    const [alert, setAlert] = React.useState({});
    const history = useHistory();
    const token = props.location.search.slice(7);

    if (isUserAuthenticated()) {
        return <Redirect to="/" />;
    }

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
            const response = await updateUserAPI({
                data: {
                    password: data.password,
                },
                token: token,
            });
            if (response.status === 200) {
                setAlert({ type: "success", message: "Password changed successfully" });
                setData({});
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
                <BaseForm hidePasswordField hideEmailField handleSubmit={handleSubmit} alert={alert}>
                    <Form.Group className="mb-3">
                        <Form.Label>Change Password</Form.Label>
                        <Form.Control
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            type="text"
                            defaultValue={data.password}
                            placeholder="Enter Password"
                            isInvalid={error.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            type="text"
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
                    <Button style={{ width: "100%" }} variant="secondary" onClick={() => history.push("/login")}>
                        Login
                    </Button>
                </BaseForm>
            )}
        </>
    );
}

export default ChangePassword;
