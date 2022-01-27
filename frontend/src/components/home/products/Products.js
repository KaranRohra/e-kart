import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "components/home/products/ProductCard";
import ProductCarousel from "components/home/products/ProductCarousel";
import { getProducts } from "services/apis/products";
import SkeletonLoader from "components/common/spinners/SkeletonLoader";
import { getRecentlyViewProductsAPI } from "services/actions/recently-view";
import { isUserAuthenticated } from "services/apis/accounts";

function Products() {
    const coronaURL = "https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50";
    const [products, setProducts] = React.useState([]);
    const [recentlyViewedProducts, setRecentlyViewedProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const callAPI = async () => {
            const response = await getProducts({ page: 1 });
            const recentlyViewedProductsResponse = await getRecentlyViewProductsAPI();
            setProducts(response.data.results);
            setRecentlyViewedProducts(recentlyViewedProductsResponse.data);
            setLoading(false);
        };
        callAPI();
    }, []);

    return (
        <div>
            {loading ? (
                <SkeletonLoader />
            ) : (
                <>
                    <Row className="bg-secondary p-5">
                        {products.map((product, index) => (
                            <Col key={index}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                    <div className="m-2">
                        <a href="https://pmnrf.gov.in/en/online-donation" target="_blank" rel="noreferrer">
                            <img
                                src={coronaURL}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                alt="corona"
                            />
                        </a>
                    </div>

                    {isUserAuthenticated() && <ProductCarousel products={recentlyViewedProducts} />}
                </>
            )}
        </div>
    );
}

export default Products;
