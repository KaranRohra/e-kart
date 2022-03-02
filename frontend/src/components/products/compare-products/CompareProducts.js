import React from "react";
import { Button, Table } from "react-bootstrap";
import "static/styles/compare-products/compare.css";
import ProductSalesGraph from "components/products/sales-graph/ProductSalesGraph";
import { getProductSalesGraphAPI, getProduct, getCompareProductsAPI } from "services/apis/products";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { addProductToCartAPI } from "services/apis/cart";
import { addProductToCart } from "services/actions/cart";
import { isUserAuthenticated } from "services/apis/accounts";
import { Link, useHistory } from "react-router-dom";
import { Context } from "App";
import * as Icons from "react-bootstrap-icons";
import NotFoundIcon from "components/common/404/NotFoundIcon";

function CompareProducts() {
    const history = useHistory();
    const context = React.useContext(Context);
    const [products, setProducts] = React.useState([]);
    const [compareProducts, setCompareProducts] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const compare = Object.keys(JSON.parse(window.localStorage.getItem("compare") || "{}")).sort((a, b) => a - b);

        const callApi = async () => {
            const productsData = [];
            for (let i = 0; i < compare.length; i++) {
                const graphDataResponse = await getProductSalesGraphAPI({ productId: compare[i] });
                const productResponse = await getProduct({ productId: compare[i] });

                productResponse.data["graphData"] = graphDataResponse.data;
                productsData.push(productResponse.data);
            }
            const compareProductData = await getCompareProductsAPI({ ids: String(compare).replaceAll(",", ".") });

            setCompareProducts(compareProductData.data);
            setProducts(productsData);
            setLoading(false);
        };
        callApi();
    }, []);

    const handleAddToCart = async (product) => {
        if (!isUserAuthenticated()) history.push("/login");

        const productToAdd = context.state.cart || {};
        productToAdd[product.id] = product;
        context.dispatch(addProductToCart(productToAdd));
        await addProductToCartAPI({ id: product.id });
    };

    const handleRemoveFromCompare = (product) => {
        const compare = JSON.parse(window.localStorage.getItem("compare") || "{}");
        delete compare[product.id];
        window.localStorage.setItem("compare", JSON.stringify(compare));
        window.location.reload();
    };

    return (
        <div className="snippet-body body-custom">
            {loading ? (
                <BoxSpinner message="Comparing product for you please be wait..." />
            ) : (
                <>
                    {products.length > 0 ? (
                        <div className="container-fluid">
                            <div className="table-responsive-custom">
                                <Table bordered className="table-custom bg-light">
                                    <thead className="thead-custom">
                                        <tr className="simple-head">
                                            <th width="20%" className="th-custom bg-light">
                                                <div className="bg-white h-100 w-100"></div>
                                            </th>
                                            {products.map((product, i) => (
                                                <th key={i} width="20%" className="th-custom bg-light">
                                                    <div className="mb-2">
                                                        <div
                                                            style={{ display: "flex", justifyContent: "space-between" }}
                                                        >
                                                            <div
                                                                style={{ width: 180, height: 90 }}
                                                                className="border border-dark"
                                                            >
                                                                <img
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "contain",
                                                                    }}
                                                                    variant="top"
                                                                    src={product.images[0].image_url}
                                                                    alt="ProductImage"
                                                                />
                                                            </div>
                                                            <Button
                                                                onClick={() => handleRemoveFromCompare(product)}
                                                                variant="outlined"
                                                                style={{ height: "25%" }}
                                                            >
                                                                <Icons.Trash size={20} className="text-danger" />
                                                            </Button>
                                                        </div>
                                                        <Link
                                                            to={`/products/${product.id}`}
                                                            className="d-block text-custom-truncate ml-1"
                                                        >
                                                            {product.long_title}
                                                        </Link>
                                                        <hr />
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <h6 className="mb-0">₹{product.selling_price}</h6>
                                                            <Button onClick={() => handleAddToCart(product)}>
                                                                Add to cart
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(compareProducts).map((title, i) => (
                                            <React.Fragment key={i}>
                                                <tr className="tr-custom" key={i}>
                                                    <th scope="row" colSpan="4">
                                                        <h3> {title} </h3>
                                                    </th>
                                                </tr>
                                                {Object.keys(compareProducts[title]).map((innerTitle, j) => (
                                                    <tr className="tr-custom" key={j}>
                                                        <th scope="row">{innerTitle}</th>
                                                        {compareProducts[title][innerTitle].map((value, k) => (
                                                            <td key={k}>{value}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="">
                                <hr />
                                {products.length >= 1 && <ProductSalesGraph products={products} />}
                            </div>
                        </div>
                    ) : (
                        <NotFoundIcon
                            detailText="Go to home page and add some products to compare"
                            redirectUrl="/"
                            title="Sorry, no result found"
                            btnText="Go to home page"
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default CompareProducts;
