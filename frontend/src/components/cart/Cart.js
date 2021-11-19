import React from "react";
import { Button, Container, Badge } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import ProductView from "components/cart/ProductView";
import SubTotal from "components/cart/SubTotal";
import Header from "components/header/Header";
import { Context } from "App";
import { getProductsFromCartAPI, removeProductFromCartAPI } from "services/apis/cart";
import { addProductToCart, removeProductFromCart } from "services/actions/cart";
import SkeletonLoader from "components/common/spinners/SkeletonLoader";

function Cart() {
    const context = React.useContext(Context);
    const [loading, setLoading] = React.useState(true);
    const [productsIDs, setProductsIDs] = React.useState([]);

    React.useEffect(() => {
        document.title = "Cart";
        document.body.style.backgroundColor = "#f5f5f5";
    });

    React.useEffect(() => {
        const callApi = async () => {
            const response = await getProductsFromCartAPI();
            const productToAdd = {};
            response.data.forEach((product) => {
                productToAdd[product.id] = product;
            });
            context.dispatch(addProductToCart(productToAdd));
            setLoading(false);
            setProductsIDs(Object.keys(productToAdd));
        };
        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveProductFromCart = (productID) => {
        removeProductFromCartAPI({ id: productID });
        context.dispatch(
            removeProductFromCart({
                cart: context.state.cart,
                productID: productID,
            })
        );
        setProductsIDs(productsIDs.filter((id) => id !== productID));
    };

    return (
        <>
            <Header />
            {loading ? (
                <SkeletonLoader />
            ) : (
                <Container className="mt-5">
                    <div style={{ display: "flex" }}>
                        <div style={{ flexGrow: 0.8, background: "white" }} className="p-3">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5 variant="primary">
                                    <Badge bg="secondary">
                                        {Object.keys(context.state.cart).length} {"  "}
                                        <Icons.Cart />
                                    </Badge>
                                </h5>
                                <Button>Place Order</Button>
                            </div>
                            <hr />
                            <ProductView
                                productsIDs={productsIDs}
                                products={context.state.cart}
                                handleRemoveProductFromCart={handleRemoveProductFromCart}
                            />
                        </div>
                        <div className="ms-5">
                            <SubTotal />
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

export default Cart;
