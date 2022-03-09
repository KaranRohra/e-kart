import React from "react";
import { Container } from "react-bootstrap";
import { Context } from "App";
import Header from "components/header/Header";
import Footer from "components/common/footer/Footer";
import { removeProductFromWishlistAPI } from "services/apis/wishlist";
import { removeProductFromWishlist } from "services/actions/wishlist";
import MultiProductView from "components/products/multi-product/MultiProductView";

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
            <Container className="pb-2 pt-5">
                <div className="p-2 ps-3 mb-2">
                    <h4>My Wishlist ({Object.keys(products).length})</h4>
                </div>
                {Object.keys(products).length > 0 ? (
                    <MultiProductView
                        products={products}
                        handleRemoveFromWishlist={handleRemoveFromWishlist}
                        removeProductFromWishlistAPI={removeProductFromWishlistAPI}
                        showRemoveBtn
                    />
                ) : (
                    <h1> Wishlist is empty </h1>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default Wishlist;
