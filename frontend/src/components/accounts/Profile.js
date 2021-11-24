import { Context } from "App";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import Header from "components/header/Header";
import React from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
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
            email: event.target.email.value,
            phone_number: event.target.phoneNumber.value,
        };
        setLoading(true);
        const callAPI = async () => {
            const response = await updateUserAPI(user);
            if (response.status === 200) {
                setAlert({ type: "success", message: "Profile updated successfully." });
                context.dispatch(setUser(response.data));
            } else {
                setAlert({ type: "warning", message: "Email is already exist." });
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
                        <Container className="mt-3 border border-primary p-3">
                            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
                            <h1>Profile</h1>
                            <hr />
                            <Form onSubmit={updateUserDetails}>
                                <Row>
                                    <Col>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            placeholder="Email"
                                            defaultValue={context.state.user.email}
                                            name="email"
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            placeholder="Phone number"
                                            defaultValue={context.state.user.phone_number}
                                            name="phoneNumber"
                                            required
                                        />
                                    </Col>
                                </Row>
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
                                        <Button className="btn btn-primary">Change Password</Button>
                                    </Col>
                                    <Col>
                                        <Button type="submit" className="btn btn-primary" style={{ float: "right" }}>
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
