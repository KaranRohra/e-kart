import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import BaseForm from "components/accounts/BaseForm";
import { sendPasswordResetLinkAPI, createUserAPI } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";

function ForgotPassword() {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const callAPI = async () => {
            const userResponse = await createUserAPI(data);
            if (userResponse.error.email && userResponse.error.email.length > 0) {
                sendPasswordResetLinkAPI(data);
                setAlert({
                    type: "success",
                    message: `Password reset link sent to ${data.email}.`,
                });
            } else {
                setAlert({
                    type: "danger",
                    message: "Account with this email does not exist",
                });
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
