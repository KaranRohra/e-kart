import React from "react";
import { Row, Col, Button } from "react-bootstrap";

function Specification(props) {
    const [readMore, setReadMore] = React.useState({
        visibility: "hidden",
        height: 0,
    });

    return (
        <div>
            {props.specifications.map((specification, i) => (
                <div style={i !== 0 ? readMore : {}} className="m-3" key={i}>
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
                </div>
            ))}
            {readMore.visibility === "hidden" && (
                <Button
                    className="mt-2"
                    style={{ width: "100%" }}
                    onClick={() => setReadMore({ visibility: "visible", height: "auto" })}
                    variant="warning"
                >
                    <span>Read More</span>
                </Button>
            )}
        </div>
    );
}

export default Specification;
