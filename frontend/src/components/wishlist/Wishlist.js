import React from "react";
import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import { Context } from "App";
import Header from "components/header/Header";
import Footer from "components/common/footer/Footer";
import { removeProductFromWishlist } from "services/actions/wishlist";
import { removeProductFromWishlistAPI } from "services/apis/wishlist";

function Wishlist() {
    const context = React.useContext(Context);
    const products = context.state.wishlist || [];

    const handleRemoveFromWishlist = (productID) => {
        context.dispatch(
            removeProductFromWishlist({
                wishlist: context.state.wishlist,
                productID: productID,
            })
        );
    };

    return (
        <>
            <Header />
            <Container className="pb-2 pt-5 bg-light">
                {Object.keys(products).length > 0 ? (
                    <>
                        {Object.keys(products).map((productID, key) => {
                            const product = products[productID];
                            return (
                                <React.Fragment key={key}>
                                    <div
                                        style={{ display: "flex", padding: 24 }}
                                        className="mb-4 d-flex justify-content-start border border-dark"
                                    >
                                        {/* Product Image */}
                                        <div style={{ width: 112, height: 78.5 }}>
                                            <img
                                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                src={product.images[0].image_url}
                                                alt=""
                                            />
                                        </div>
                                        {/* Product Details */}
                                        <Col className="ms-3" xs={9}>
                                            <h6 className="text-truncate" style={{ maxWidth: 700 }}>
                                                <Link to={`/products/${productID}`}>{product.long_title}</Link>
                                            </h6>
                                            <small className="text-secondary">{product.tagline}</small> <br />
                                            <small className="text-secondary">
                                                Seller: {product.seller.first_name} {product.seller.last_name}
                                            </small>
                                        </Col>
                                        {/* Price Details */}
                                        <Col xs={2}>
                                            <p style={{ fontWeight: "bold" }}>₹{product.selling_price}</p>
                                            <strike>₹{product.actual_price}</strike>
                                        </Col>
                                        <Col>
                                            <Icons.XLg
                                                onClick={() => {
                                                    removeProductFromWishlistAPI(productID);
                                                    handleRemoveFromWishlist(productID);
                                                }}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Col>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </>
                ) : (
                    <h1> Wishlist is empty </h1>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default Wishlist;
