import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ProductCard({ product }) {
    const history = useHistory();

    return (
        <Card
            style={{ width: "18rem", cursor: "pointer" }}
            className="m-2"
            onClick={() => history.push(`/products/${product.id}`)}
        >
            <div style={{ width: 286, height: 180 }} className="border border-dark">
                <Card.Img
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    variant="top"
                    src={product.images[0].image_url}
                />
            </div>
            <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>{product.short_title}</Card.Title>

                <Card.Text>{product.tagline} </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
