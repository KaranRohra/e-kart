import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import BaseForm from "components/accounts/BaseForm";
import { authenticateUserAPI, isUserAuthenticated } from "services/apis/accounts";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import Cookies from "universal-cookie";

function Login() {
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({});
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });
    const history = useHistory();
    const cookies = new Cookies();

    if (isUserAuthenticated()) {
        return <Redirect to="/" />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        data["username"] = data["email"];
        const callAPI = async () => {
            const response = await authenticateUserAPI(data);
            if (response.status === 200) {
                cookies.set("token", response.data.token);
                history.push("/");
                return;
            } else {
                setAlert({
                    type: "danger",
                    message: "Account does not exist or wrong password",
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
                <BoxSpinner message="Logging in..." />
            ) : (
                <BaseForm data={data} setData={setData} handleSubmit={handleSubmit} alert={alert}>
                    <Button style={{ width: "100%" }} variant="primary" type="submit">
                        Sign In
                    </Button>
                    <p>
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                    <p>
                        Forgot password? <Link to="/forgot-password">Reset it</Link>
                    </p>
                </BaseForm>
            )}
        </>
    );
}

export default Login;
