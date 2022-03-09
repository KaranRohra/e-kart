import React from "react";
import "static/styles/reviews/reviews.css";
import UpperReview from "components/products/reviews/UpperReview";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { getProduct, getProductRatingsAndReviewsAPI } from "services/apis/products";
import { Context } from "App";
import { useParams } from "react-router";

function Reviews() {
    const [product, setProduct] = React.useState();
    const [ratingsAndReviews, setRatingsAndReviews] = React.useState();
    const [pageNo, setPageNo] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const context = React.useContext(Context);
    const { id } = useParams();

    React.useEffect(() => {
        setLoading(true);
        const callApi = async () => {
            const product = await getProduct({
                productId: id,
            });
            const ratingsAndReviews = await getProductRatingsAndReviewsAPI({
                productId: id,
                userId: (context.state.user && context.state.user.id) || 0,
                pageNo: pageNo,
            });
            setProduct(product.data);
            setRatingsAndReviews(ratingsAndReviews.data);
            setLoading(false);
        };
        callApi();
        // eslint-disable-next-line
    }, [pageNo]);
    return (
        <div>
            {loading ? (
                <BoxSpinner messgae="Getting details review for you..." />
            ) : (
                <UpperReview
                    product={product}
                    ratingsAndReviews={ratingsAndReviews}
                    productId={id}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                />
            )}
        </div>
    );
}

export default Reviews;
