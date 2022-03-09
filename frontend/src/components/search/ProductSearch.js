import React from "react";
import NotFoundIcon from "components/common/404/NotFoundIcon";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { getProductsBySearchAPI } from "services/apis/products";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "static/styles/paginator.css";

function ProductSearch() {
    const [productsDetails, setProductsDetails] = React.useState([]);
    const [pageNo, setPageNo] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const { value } = useParams();
    const itemsPerPage = 12;

    React.useEffect(() => {
        setIsLoading(true);
        const callAPI = async () => {
            const response = await getProductsBySearchAPI({
                search: value,
                pageNo: pageNo,
            });
            setProductsDetails(response.data);
            setIsLoading(false);
        };
        callAPI();
    }, [value, pageNo]);

    const handlePageClick = (pageNoClicked) => {
        setPageNo(pageNoClicked);
    };

    return (
        <Container className="mt-5">
            {isLoading ? (
                <BoxSpinner message="Get best match for you..." />
            ) : productsDetails.results.length > 0 ? (
                <div>
                    {productsDetails.results.map((product, key) => (
                        <React.Fragment key={key}>
                            <div
                                style={{ display: "flex", padding: 24 }}
                                className="mb-4 d-flex justify-content-start bg-light"
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
                                        <Link to={`/products/${product.id}`}>{product.long_title}</Link>
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
                            </div>
                        </React.Fragment>
                    ))}
                    <div className="page__number mt-4">
                        <ReactPaginate
                            breakLabel={<span>...</span>}
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={Math.ceil(productsDetails.count / itemsPerPage)}
                            onPageChange={(e) => handlePageClick(e.selected + 1)}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                            forcePage={pageNo - 1}
                        />
                    </div>
                </div>
            ) : (
                <NotFoundIcon
                    btnText="Go to Home"
                    redirectUrl="/"
                    title="Sorry, no result found"
                    detailText="Edit search or go back to Home Page"
                />
            )}
        </Container>
    );
}

export default ProductSearch;
