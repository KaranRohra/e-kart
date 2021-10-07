import React from "react";
import { Col, Row } from "react-bootstrap";

function Footer() {
    return (
        <div className="bg-dark mt-5 text-light" style={{ display: "flex", justifyContent: "center" }}>
            <Row className="flex-column border border-light p-5" style={{ width: "30%" }}>
                <Col>
                    {" "}
                    <h5>Our Partners</h5>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>Sujeta Surlkar (Mentor)</p>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>Khushboo Bajaj (Backend Developer)</p>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>Anisha Dhameja (Backend Developer)</p>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>Karan Rohra (Frontend Developer)</p>{" "}
                </Col>
            </Row>
            <Row className="flex-column border border-light p-5" style={{ width: "30%" }}>
                <Col xs={12}>
                    {" "}
                    <h5>College</h5>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>Hashu Adwani Memorial Complex, Collector's Colony, Chembur, Mumbai, Maharashtra 400074</p>{" "}
                </Col>
                <Col>
                    {" "}
                    <a href="https://vesit.ves.ac.in/" target="_blank" rel="noreferrer">
                        VISIT
                    </a>{" "}
                </Col>
            </Row>
            <Row className="flex-column border border-light p-5" style={{ width: "30%" }}>
                <Col>
                    {" "}
                    <h5>Contact Us</h5>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>2019khushboo.bajaj@ves.ac.in</p>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>2019anisha.dhameja@ves.ac.in</p>{" "}
                </Col>
                <Col>
                    {" "}
                    <p>2019karan.rohra@ves.ac.in</p>{" "}
                </Col>
            </Row>
        </div>
    );
}

export default Footer;
