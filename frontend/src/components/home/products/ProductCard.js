import React from "react";
import { Card, Button } from "react-bootstrap";

function ProductCard({ product }) {
    return (
        <Card style={{ width: "18rem" }} className="m-2">
            <div style={{ width: 286, height: 180 }} className="border border-dark">
                <Card.Img
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    variant="top"
                    src={product.url}
                />
            </div>
            <Card.Body>
                <Card.Title>{product.title.shortTitle}</Card.Title>
                <Card.Text>{product.tagline} </Card.Text>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>₹{product.price.mrp}</b>
                    <Button variant="primary">View</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
