import React from "react";
import { Container, Form, Col, Row, Image, Alert } from "react-bootstrap";
import fullLogo from "static/images/full-logo.png";

function BaseForm(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <Container className="p-5">
            <Row>
                <Col md={{ offset: 3, span: 7 }} lg={{ offset: 4, span: 5 }} xl={{ offset: 4, span: 4 }}>
                    <Image src={fullLogo} fluid className="ps-lg-4 ms-5" />
                    <Form className="mt-3" onSubmit={props.handleSubmit}>
                        {props.alert && <Alert variant={props.alert.type}>{props.alert.message}</Alert>}
                        {!props.hideEmailField && (
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    onChange={(e) => props.setData({ ...props.data, email: e.target.value })}
                                    defaultValue={props.data.email || ""}
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    required
                                />
                            </Form.Group>
                        )}

                        {!props.hidePasswordField && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        onChange={(e) => props.setData({ ...props.data, password: e.target.value })}
                                        defaultValue={props.data.password || ""}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        name="password"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </Form.Group>
                            </>
                        )}
                        {props.children}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default BaseForm;
