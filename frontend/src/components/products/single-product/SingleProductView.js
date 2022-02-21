import React from "react";
import { Carousel, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import * as Icons from "react-bootstrap-icons";
import { getProduct, getProductSalesGraphAPI } from "services/apis/products";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import Specification from "components/products/single-product/Specification";
import { Context } from "App";
import { addProductToCart } from "services/actions/cart";
import { addProductToCartAPI } from "services/apis/cart";
import { isUserAuthenticated } from "services/apis/accounts";
import { addProductToWishlist, removeProductFromWishlist } from "services/actions/wishlist";
import { addProductToWishlistAPI, removeProductFromWishlistAPI } from "services/apis/wishlist";
import { addProductToRecentlyViewAPI } from "services/actions/recently-view";
import ProductSalesGraph from "components/products/sales-graph/ProductSalesGraph";

function SingleProductView() {
    const history = useHistory();
    const context = React.useContext(Context);
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState(null);
    const [addingProductToCart, setAddingProductToCart] = React.useState(false);
    const { id } = useParams();

    React.useEffect(() => {
        const callApi = async () => {
            const response = await getProduct({ productId: id });
            const graphData = await getProductSalesGraphAPI({ productId: id });
            response.data["graphData"] = graphData.data;
            setProduct(response.data);
            setLoading(false);
        };
        callApi();
        addProductToRecentlyViewAPI(id);
    }, [id]);

    const handleAddToCart = () => {
        const productToAdd = context.state.cart || {};
        productToAdd[product.id] = product;
        context.dispatch(addProductToCart(productToAdd));
    };

    const handleAddToWishlist = () => {
        addProductToWishlistAPI(product.id);
        const productToAdd = context.state.wishlist || {};
        productToAdd[product.id] = product;
        context.dispatch(addProductToWishlist(productToAdd));
    };

    const handleRemoveFromWishlist = () => {
        removeProductFromWishlistAPI(product.id);
        context.dispatch(
            removeProductFromWishlist({
                wishlist: context.state.wishlist,
                productID: product.id,
            })
        );
    };

    return (
        <Container style={{ background: "white" }}>
            {loading ? (
                <BoxSpinner message="Getting product for you please wait 🤗" />
            ) : (
                <>
                    <Row>
                        <Col md={5} xs={12} className="m-3">
                            <Carousel style={{ width: "550px" }} variant="dark">
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
                            {addingProductToCart ? (
                                <div className="text-center mt-2">
                                    <Button disabled>
                                        <Spinner animation="border" variant="warning" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={async () => {
                                        if (!isUserAuthenticated()) history.push("/login");
                                        setAddingProductToCart(true);
                                        handleAddToCart();
                                        await addProductToCartAPI({ id: product.id });
                                        setAddingProductToCart(false);
                                    }}
                                    variant="warning"
                                    className="m-3"
                                    style={{ width: "100%", fontSize: "18px" }}
                                >
                                    Add to Cart <Icons.CartFill style={{ color: "blue" }} />
                                </Button>
                            )}
                        </Col>
                        <Col className="m-3">
                            <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                <Col xs={11}>
                                    <h6>{product.long_title}</h6>
                                </Col>
                                <Col>
                                    {isUserAuthenticated() && (
                                        <>
                                            {product.id in context.state.wishlist ? (
                                                <Icons.HeartFill
                                                    onClick={handleRemoveFromWishlist}
                                                    style={{ color: "red", fontSize: 22, cursor: "pointer" }}
                                                />
                                            ) : (
                                                <Icons.Heart
                                                    onClick={handleAddToWishlist}
                                                    style={{ color: "red", fontSize: 22, cursor: "pointer" }}
                                                />
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <p className="mt-1 text-success">
                                Extra ₹{product.actual_price - product.selling_price} off
                            </p>
                            <div style={{ display: "flex" }}>
                                <h4>₹{product.selling_price}</h4>
                                <strike className="ms-2 text-secondary">₹{product.actual_price}</strike>
                                <p className="ms-2 text-success">{product.discount}% off</p>
                            </div>
                            <hr />
                            <div>
                                <h5>Product Description</h5>
                                <p>{product.description}</p>
                            </div>
                            <hr />
                            <div>
                                <h3>Specification</h3>
                                <Specification specifications={product.specification_titles} />
                            </div>
                        </Col>
                    </Row>

                    <div className="">
                        <hr />
                        <ProductSalesGraph products={[product]} />
                    </div>
                </>
            )}
        </Container>
    );
}

export default SingleProductView;
