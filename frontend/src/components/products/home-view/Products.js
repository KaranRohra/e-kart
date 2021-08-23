import React from "react";
import { Row, Col } from "react-bootstrap";
import { products } from "./dummyProductsData";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";

function Products() {
    const coronaURL = "https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50";

    return (
        <div>
            <Row className="bg-secondary p-5">
                {products.map((product, index) => (
                    <Col key={index}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
            <div className="m-2">
                <img src={coronaURL} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            </div>
            <ProductCarousel products={products} />
        </div>
    );
}

export default Products;
