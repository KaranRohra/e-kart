import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ViewAddresses() {
    return (
        <Container className="mt-3 mb-3 p-3 bg-dark text-light">
            <h2>Address</h2>
            <hr />
            <Row className="justify-content-center">
                {Array.from([1, 1, 1, 1]).map((address, index) => (
                    <Col className="mt-2" key={index}>
                        <Card style={{ width: "18rem" }} className="text-dark">
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </Card.Text>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button variant="primary">Edit</Button>
                                    <Button variant="danger">Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ViewAddresses;
