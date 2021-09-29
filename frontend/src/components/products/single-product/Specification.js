import React from "react";
import { Row, Col } from "react-bootstrap";

function Specification(props) {
    return (
        <div>
            {props.specifications.map((specification, i) => (
                <div className="m-3">
                    <Row className="border p-2">
                        <Col>
                            <h4>{specification.title}</h4>
                        </Col>
                    </Row>
                    {specification.specifications.map((item, j) => (
                        <Row className="p-2 border" key={j}>
                            <Col className="text-secondary" xs={3}>
                                {item.name}
                            </Col>
                            <Col>{item.value}</Col>
                        </Row>
                    ))}
                    {/* TODO Insert Read More Button */}
                </div>
            ))}
        </div>
    );
}

export default Specification;
