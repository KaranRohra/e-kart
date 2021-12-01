import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { Context } from "App";
import { updateUserAPI } from "services/apis/accounts";
import GoBackButton from "components/common/GoBackButton";

function ChangeEmail() {
    const context = React.useContext(Context);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        current_email: context.state.user.email,
    });
    const [alert, setAlert] = React.useState({});

    const formFields = [
        {
            name: "current_email",
            disabled: true,
            label: "Current Email",
        },
        {
            label: "New Email",
            name: "new_email",
            placeholder: "Enter new email",
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await updateUserAPI(data);
        if (response.status === 200) {
            setAlert({ variant: "success", message: "Email updated successfully." });
            context.state.user.email = data.new_email;
        } else {
            setAlert({ variant: "danger", message: "Account with new email already exist." });
        }
        setLoading(false);
    };

    return (
        <Container className="p-5 mt-5 bg-dark text-light">
            {loading ? (
                <BoxSpinner message="Updating Email..!" />
            ) : (
                <Row>
                    <Col md={{ offset: 3, span: 7 }} lg={{ offset: 4, span: 5 }} xl={{ offset: 4, span: 4 }}>
                        {alert.variant === "success" ? (
                            <GoBackButton alert={alert} url="profile" />
                        ) : (
                            <>
                                <h3>Update Email</h3>
                                <Form className="mt-3" onSubmit={handleSubmit}>
                                    {alert.variant && <Alert variant={alert.variant}>{alert.message}</Alert>}
                                    {formFields.map((field, key) => (
                                        <React.Fragment key={key}>
                                            <Form.Label>{field.label}</Form.Label>
                                            <Form.Group className="mb-3">
                                                {/* <Form.Label>Old Password</Form.Label> */}
                                                <Form.Control
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.name]: e.target.value })
                                                    }
                                                    type="email"
                                                    placeholder={field.placeholder}
                                                    name={field.name}
                                                    defaultValue={data[field.name]}
                                                    disabled={field.disabled}
                                                    required
                                                />
                                            </Form.Group>
                                        </React.Fragment>
                                    ))}
                                    <Button variant="primary m-1" type="submit">
                                        Update Email
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

export default ChangeEmail;
