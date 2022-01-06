import React from "react";
import { Container, Badge } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import ProductView from "components/cart/ProductView";
import SubTotal from "components/cart/SubTotal";
import Header from "components/header/Header";
import { Context } from "App";
import { addProductToCartAPI, getProductsFromCartAPI, removeProductFromCartAPI } from "services/apis/cart";
import { addProductToCart, removeProductFromCart } from "services/actions/cart";
import SkeletonLoader from "components/common/spinners/SkeletonLoader";
import SaveForLater from "components/cart/SaveForLater";
import { Link } from "react-router-dom";

function Cart() {
    const context = React.useContext(Context);
    const [loading, setLoading] = React.useState(true);
    const [productsIDs, setProductsIDs] = React.useState([]);
    const [saveForLaterProducts, setSaveForLaterProducts] = React.useState({});
    const numberOfProductInCart = Object.keys(context.state.cart).length;

    React.useEffect(() => {
        document.title = "Cart";
        document.body.style.backgroundColor = "#f5f5f5";
    });

    React.useEffect(() => {
        const callApi = async () => {
            const response = await getProductsFromCartAPI();
            const saveForLaterResponse = await getProductsFromCartAPI({ type: "SAVE_FOR_LATER" });

            const productToAdd = {},
                productsInSaveForLater = {};
            response.data.forEach((product) => {
                productToAdd[product.id] = product;
            });
            saveForLaterResponse.data.forEach((product) => {
                productsInSaveForLater[product.id] = product;
            });
            context.dispatch(addProductToCart(productToAdd));
            setLoading(false);
            setProductsIDs(Object.keys(productToAdd));
            setSaveForLaterProducts(productsInSaveForLater);
        };
        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveProductFromCart = (productID) => {
        const removedProduct = context.state.cart[productID];
        removeProductFromCartAPI({ id: productID });
        context.dispatch(
            removeProductFromCart({
                cart: context.state.cart,
                productID: productID,
            })
        );
        setProductsIDs(productsIDs.filter((id) => id !== productID));
        return removedProduct;
    };

    const handleSaveForLater = (productID) => {
        const removedProduct = handleRemoveProductFromCart(productID);
        addProductToCartAPI({ id: productID, type: "SAVE_FOR_LATER" });
        setSaveForLaterProducts({ ...saveForLaterProducts, [productID]: removedProduct });
    };

    const handleRemoveSaveForLaterProduct = (productID) => {
        const removedProduct = saveForLaterProducts[productID];
        removeProductFromCartAPI({ id: productID, type: "SAVE_FOR_LATER" });
        delete saveForLaterProducts[productID];
        setSaveForLaterProducts({ ...saveForLaterProducts });
        return removedProduct;
    };

    const handleMoveToCart = (productID) => {
        const removedProduct = handleRemoveSaveForLaterProduct(productID);
        addProductToCartAPI({ id: productID });
        setProductsIDs([...productsIDs, productID]);
        context.dispatch(addProductToCart({ ...context.state.cart, [productID]: removedProduct }));
    };

    return (
        <>
            <Header />
            {loading ? (
                <SkeletonLoader />
            ) : (
                <Container className="mt-5">
                    <div style={{ display: "flex" }}>
                        <div style={{ flexGrow: 0.8 }}>
                            <div className="bg bg-light p-3">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h5 variant="primary">
                                        <Badge bg="secondary">
                                            {numberOfProductInCart}
                                            <Icons.Cart className="ms-1" />
                                        </Badge>
                                    </h5>
                                    {numberOfProductInCart !== 0 && (
                                        <Link to="/review-order" className="btn btn-primary">
                                            Proceed
                                        </Link>
                                    )}
                                </div>
                                <hr />
                                <ProductView
                                    productsIDs={productsIDs}
                                    products={context.state.cart}
                                    handleRemoveProductFromCart={handleRemoveProductFromCart}
                                    handleSaveForLater={handleSaveForLater}
                                />
                            </div>
                            {Object.keys(saveForLaterProducts).length !== 0 && (
                                <SaveForLater
                                    products={saveForLaterProducts}
                                    handleRemoveSaveForLaterProduct={handleRemoveSaveForLaterProduct}
                                    handleMoveToCart={handleMoveToCart}
                                />
                            )}
                        </div>
                        <div>
                            <SubTotal />
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

export default Cart;
