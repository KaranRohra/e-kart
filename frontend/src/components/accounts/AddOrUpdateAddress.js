import React from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { State, City } from "country-state-city";
import { useParams, Link } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { Context } from "App";
import { createUserAddressAPI, getUserAddressByIdAPI, updateUserAddressAPI } from "services/apis/accounts";

function AddOrUpdateAddress() {
    const [address, setAddress] = React.useState({});
    const [loadingMessage, setLoadingMessage] = React.useState("");
    const [cities, setCities] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({});
    const context = React.useContext(Context);
    const states = State.getStatesOfCountry("IN");
    const { id } = useParams();

    const handleStateChange = (event) => {
        let localCities = {};
        for (let state of states) {
            if (state.name === event.target.value) {
                localCities = City.getCitiesOfState("IN", state.isoCode);
                setCities(localCities);
                setAddress({ ...address, state: event.target.value, city: localCities[0].name });
                break;
            }
        }
    };

    React.useEffect(() => {
        setCities(City.getCitiesOfState("IN", states[0].isoCode));
        if (id) {
            const fetchAddress = async () => {
                const response = await getUserAddressByIdAPI({ id: id });
                handleStateChange({ target: { value: response.data.state } });
                setAddress(response.data);
                setLoading(false);
            };
            setLoadingMessage("Fetching address...");
            setLoading(true);
            fetchAddress();
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        if (id) {
            setLoadingMessage("Updating address...");
            const response = await updateUserAddressAPI(address);
            if (response.status === 200) {
                setAlert({
                    variant: "success",
                    message: "Address updated successfully.",
                });
            } else {
                setAlert({
                    variant: "danger",
                    message: "Server Error, Try after some time.",
                });
            }
        } else {
            setLoadingMessage("Adding address...");
            address.user = context.state.user.id;
            const response = await createUserAddressAPI(address);
            if (response.status === 201) {
                setAlert({
                    variant: "success",
                    message: "Address added successfully.",
                });
            } else {
                setAlert({
                    variant: "danger",
                    message: "Server Error, Try after some time.",
                });
            }
        }
        setLoading(false);
    };

    return (
        <Container className="p-5 mt-5 bg-dark text-light">
            {loading ? (
                <BoxSpinner message={loadingMessage} />
            ) : (
                <>
                    {alert.variant === "success" ? (
                        <div>
                            <Alert variant="success">
                                {alert.message} <Icons.CheckCircleFill className="me-1" />
                            </Alert>
                            <Link to="/profile">
                                <Button variant="success" className="mt-3">
                                    <Icons.ArrowLeft className="me-1" />
                                    Go Back
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col
                                    md={{ offset: 2, span: 10 }}
                                    lg={{ offset: 3, span: 5 }}
                                    xl={{ offset: 3, span: 6 }}
                                >
                                    <h3 className="text-center">{id ? "Edit" : "Add"} Address</h3>
                                    {alert.variant && <Alert variant={alert.variant}>{alert.message}</Alert>}
                                </Col>
                                <Col
                                    md={{ offset: 2, span: 10 }}
                                    lg={{ offset: 3, span: 5 }}
                                    xl={{ offset: 3, span: 6 }}
                                >
                                    <Form.Group>
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                            placeholder="Karan"
                                            defaultValue={address.name}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col
                                    md={{ offset: 2, span: 5 }}
                                    lg={{ offset: 3, span: 4 }}
                                    xl={{ offset: 3, span: 3 }}
                                >
                                    <Form.Group>
                                        <Form.Label>Address 1</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="1234 Main St"
                                            defaultValue={address.address_line_1}
                                            onChange={(e) => setAddress({ ...address, address_line_1: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                                    <Form.Group controlId="formGridAddress2">
                                        <Form.Label>Address 2</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Apartment, studio, or floor"
                                            defaultValue={address.address_line_2}
                                            onChange={(e) => setAddress({ ...address, address_line_2: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col
                                    md={{ offset: 2, span: 5 }}
                                    lg={{ offset: 3, span: 4 }}
                                    xl={{ offset: 3, span: 3 }}
                                >
                                    <Form.Group>
                                        <Form.Label>State</Form.Label>
                                        <Form.Select
                                            defaultValue={address.state || states[0].name}
                                            onChange={handleStateChange}
                                        >
                                            {states.map((state, index) => (
                                                <option key={index} value={state.stateCode}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            defaultValue={address.city}
                                        >
                                            {cities.map((city, index) => (
                                                <option key={index}>{city.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col
                                    md={{ offset: 2, span: 5 }}
                                    lg={{ offset: 3, span: 4 }}
                                    xl={{ offset: 3, span: 3 }}
                                >
                                    <Form.Group>
                                        <Form.Label>Land Mark</Form.Label>
                                        <Form.Control
                                            onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                                            placeholder="Hira Ghat"
                                            defaultValue={address.landmark}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                                    <Form.Group>
                                        <Form.Label>Pin Code</Form.Label>
                                        <Form.Control
                                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                            placeholder="400001"
                                            defaultValue={address.pincode}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col
                                    md={{ offset: 2, span: 5 }}
                                    lg={{ offset: 3, span: 4 }}
                                    xl={{ offset: 3, span: 3 }}
                                >
                                    <Form.Group>
                                        <Form.Label>Phone Number 1</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="1234567890"
                                            onChange={(e) => setAddress({ ...address, phone_number_1: e.target.value })}
                                            required
                                            defaultValue={address.phone_number_1}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                                    <Form.Group>
                                        <Form.Label>Phone Number 2 (Optional)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="1234567890"
                                            defaultValue={address.phone_number_2}
                                            onChange={(e) => setAddress({ ...address, phone_number_2: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col
                                    md={{ offset: 2, span: 5 }}
                                    lg={{ offset: 3, span: 4 }}
                                    xl={{ offset: 3, span: 3 }}
                                >
                                    <Button type="submit" variant="primary" style={{ width: "100%" }}>
                                        Save
                                    </Button>
                                </Col>
                                <Col md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                                    <Link
                                        to="/profile"
                                        as="button"
                                        className="btn btn-danger"
                                        style={{ width: "100%" }}
                                    >
                                        Cancel
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </>
            )}
        </Container>
    );
}

export default AddOrUpdateAddress;
