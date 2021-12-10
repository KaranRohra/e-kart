import React from "react";
import { Card, Form } from "react-bootstrap";

function OrderFilter(props) {
    const handleFilter = (type) => {
        if (props.filterList.includes(type)) {
            props.setFilterList(props.filterList.filter((item) => item !== type));
        } else {
            props.setFilterList([...props.filterList, type]);
        }
    };

    return (
        <div>
            <Card bg="light" text="dark" style={{ width: "18rem" }}>
                <Card.Header>
                    <h4>Filters</h4>
                </Card.Header>
                <Card.Body>
                    <div>
                        <h5>Order Status</h5>
                        <Form.Check onClick={() => handleFilter("Pending")} type="checkbox" label="On the way" />
                        <Form.Check onClick={() => handleFilter("Delivered")} type="checkbox" label="Delivered" />
                        <Form.Check onClick={() => handleFilter("Cancelled")} type="checkbox" label="Cancelled" />
                        <Form.Check onClick={() => handleFilter("Returned")} type="checkbox" label="Returned" />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OrderFilter;
