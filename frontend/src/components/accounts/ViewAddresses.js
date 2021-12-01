import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { Link } from "react-router-dom";
import { getUserAddressAPI, updateUserAddressAPI } from "services/apis/accounts";

function ViewAddresses() {
    const [addresses, setAddresses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getUserAddressAPI();
            setAddresses(response.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteAddress = async (address) => {
        setLoading(true);
        address.is_deleted = true;
        const response = await updateUserAddressAPI(address);
        if (response.status === 200) {
            const response = await getUserAddressAPI();
            setAddresses(response.data);
        }
        setLoading(false);
    };

    return (
        <Container className="mt-3 mb-3 p-3 bg-dark text-light">
            {loading ? (
                <BoxSpinner />
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>Address</h3>
                        <Link to="/add-address" as="button" className="btn btn-primary">
                            + Add Address
                        </Link>
                    </div>
                    <hr />
                    <Container>
                        {Object.keys(addresses).length !== 0 && (
                            <div style={{ display: "flex" }}>
                                {addresses.map((address, index) => (
                                    <div className="m-2" key={index}>
                                        <Card style={{ width: "18rem", height: "15rem" }} className="text-dark">
                                            <Card.Header>{address.name}</Card.Header>
                                            <Card.Body
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Card.Text>
                                                    {address.address_line_1}, <br />
                                                    {address.landmark}, {address.city}, <br />
                                                    {address.state} - {address.pincode}. <br />
                                                </Card.Text>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Link to={`edit-address/${address.id}`} className="btn btn-primary">
                                                        Edit
                                                    </Link>
                                                    <Button onClick={() => deleteAddress(address)} variant="danger">
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Container>
                </>
            )}
        </Container>
    );
}

export default ViewAddresses;
