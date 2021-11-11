import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "components/home/products/ProductCard";
import ProductCarousel from "components/home/products/ProductCarousel";
import { getProducts } from "services/apis/products";
import { products as dummyProduct } from "./dummyProductsData";

function Products() {
    const coronaURL = "https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50";
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const callAPI = async () => {
            const response = await getProducts({ page: 1 });
            setProducts(response.data.results);
        };
        callAPI();
    }, []);

    return (
        <div>
            <Row className="bg-secondary p-5">
                {dummyProduct.map((product, index) => (
                    <Col key={index}>
                        {/* <ProductCard product={product} /> */}
                        <ProductCard
                            product={{
                                images: [{ image_url: product.url }],
                                short_title: product.title.shortTitle,
                                tagline: product.tagline,
                            }}
                        />
                    </Col>
                ))}
            </Row>
            <div className="m-2">
                <a href="https://pmnrf.gov.in/en/online-donation" target="_blank" rel="noreferrer">
                    <img src={coronaURL} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="corona" />
                </a>
            </div>
            <ProductCarousel products={products} />
        </div>
    );
}

export default Products;
