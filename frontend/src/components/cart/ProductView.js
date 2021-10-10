import React from "react";
import { products } from "components/home/products/dummyProductsData";
import Selector from "components/cart/Selector";

function ProductView() {
    const product = products[0];
    return (
        <div>
            {[1, 2, 3].map((_, key) => (
                <React.Fragment key={key}>
                    <div style={{ display: "flex", padding: 24 }}>
                        {/* Product Image */}
                        <div style={{ width: 112, height: 78.5 }}>
                            <img
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                src={product.url}
                                alt=""
                            />
                            <Selector />
                        </div>
                        {/* Product Details */}
                        <div className="ms-3">
                            <h5>{product.title.longTitle}</h5>
                            <small className="text-secondary">{product.tagline}</small> <br />
                            <small className="text-secondary">Seller: {product.tagline}</small>
                            <div className="mt-3" style={{ display: "flex" }}>
                                <h5 style={{ fontWeight: "bold" }} className="me-2">
                                    ₹1,29,898
                                </h5>
                                <strike className="text-secondary">₹1,29,898</strike>
                            </div>
                        </div>
                    </div>
                    <hr />
                </React.Fragment>
            ))}
        </div>
    );
}

export default ProductView;
