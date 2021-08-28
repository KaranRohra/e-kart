import React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";
import { sendPasswordResetLinkAPI } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";

function ForgotPassword() {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const callAPI = async () => {
            const response = await sendPasswordResetLinkAPI(data);
            if (response.data.status === "success") {
                setSuccess(true);
                setAlert({});
            } else {
                setAlert({
                    type: "danger",
                    message: "Account with this email does not exist",
                });
                setSuccess(false);
            }
            setLoading(false);
        };
        callAPI();
    };

    return (
        <>
            {loading ? (
                <BoxSpinner message={"Sending password reset link..."} />
            ) : (
                <>
                    <Container className="mt-2">
                        {success && <Alert variant="success">Password reset link sent to {data.email} !!!</Alert>}
                    </Container>
                    <BaseForm hidePasswordField data={data} setData={setData} handleSubmit={handleSubmit} alert={alert}>
                        <Button style={{ width: "100%" }} variant="primary" type="submit">
                            Send Password Reset Link
                        </Button>
                        <Button
                            className="mt-2"
                            style={{ width: "100%" }}
                            variant="secondary"
                            onClick={() => history.push("/login")}
                        >
                            Login
                        </Button>
                    </BaseForm>
                </>
            )}
        </>
    );
}

export default ForgotPassword;
