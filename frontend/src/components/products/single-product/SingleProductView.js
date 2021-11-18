import React from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import * as Icons from "react-bootstrap-icons";
import { getProduct } from "services/apis/products";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import Specification from "components/products/single-product/Specification";
import { Context } from "App";
import { addProductToCart } from "services/actions/cart";
import { addProductToCartAPI } from "services/apis/cart";

function SingleProductView() {
    const context = React.useContext(Context);
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState(null);
    const { id } = useParams();

    React.useEffect(() => {
        const callApi = async () => {
            const response = await getProduct({ productId: id });
            setProduct(response.data);
            setLoading(false);
        };
        callApi();
    }, [id]);

    const handleAddToCart = () => {
        addProductToCartAPI({ id: product.id });
        const productToAdd = context.state.cart || {};
        productToAdd[product.id] = product;
        context.dispatch(addProductToCart(productToAdd));
    };

    return (
        <Container style={{ background: "white" }}>
            {loading ? (
                <BoxSpinner message="Getting product for you please wait 🤗" />
            ) : (
                <Row>
                    <Col md={5} xs={12} className="m-3">
                        <Carousel style={{ width: "550px" }}>
                            {product.images.map((image, index) => (
                                <Carousel.Item key={index} style={{ width: 500, height: 500 }}>
                                    <img
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        src={image.image_url}
                                        alt="ProductImage"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <Button
                            onClick={handleAddToCart}
                            variant="warning"
                            className="m-3"
                            style={{ width: "100%", fontSize: "18px" }}
                        >
                            Add to Cart <Icons.CartFill style={{ color: "blue" }} />
                        </Button>
                    </Col>
                    <Col className="m-3">
                        <h6>{product.long_title}</h6>
                        <p className="mt-1 text-success">Extra ₹{product.discount} off</p>
                        <div style={{ display: "flex" }}>
                            <h4>₹{product.selling_price}</h4>
                            <strike className="ms-2 text-secondary">₹{product.actual_price}</strike>
                            <p className="ms-2 text-success">{product.discount}% off</p>
                        </div>
                        <hr />
                        <div>
                            <h5>Product Description </h5>
                            <p>{product.description}</p>
                        </div>
                        <hr />
                        <div>
                            <h3>Specification </h3>
                            <Specification specifications={product.specification_titles} />
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default SingleProductView;
