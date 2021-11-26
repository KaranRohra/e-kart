import { Context } from "App";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import Header from "components/header/Header";
import React from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setUser } from "services/actions/accounts";
import { updateUserAPI } from "services/apis/accounts";
import ViewAddresses from "./ViewAddresses";

function Profile() {
    const context = React.useContext(Context);
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(null);

    const updateUserDetails = (event) => {
        event.preventDefault();
        const user = {
            first_name: event.target.firstName.value,
            last_name: event.target.lastName.value,
        };
        setLoading(true);
        const callAPI = async () => {
            const response = await updateUserAPI(user);
            if (response.status === 200) {
                setAlert({ type: "warning", message: "Profile updated successfully." });
                context.dispatch(setUser(response.data));
            } else {
                setAlert({ type: "danger", message: "Server Error, Try after some time." });
            }

            setLoading(false);
        };
        callAPI();
    };
    return (
        <>
            {loading ? (
                <BoxSpinner message="Updating your profile..." />
            ) : (
                <>
                    <Header />
                    <Container className="border border-warning mt-2">
                        <Container className="mt-3 border border-primary p-3 bg-dark text-light">
                            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
                            <h2>Personal Details</h2>
                            <hr />
                            <Form onSubmit={updateUserDetails}>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            placeholder="First name"
                                            defaultValue={context.state.user.first_name}
                                            name="firstName"
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            placeholder="Last name"
                                            defaultValue={context.state.user.last_name}
                                            name="lastName"
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Link to="/change-password" as="button" className="btn btn-success m-1">
                                            Change Password
                                        </Link>
                                        <Button className="btn btn-danger m-1">Change Email</Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            type="submit"
                                            className="btn btn-primary m-1"
                                            style={{ float: "right" }}
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                        <ViewAddresses />
                    </Container>
                </>
            )}
        </>
    );
}

export default Profile;
