import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import { createReviewAPI, getReviewAPI, updateReviewAPI } from "services/apis/products";
import { Context } from "App";
import BoxSpinner from "components/common/spinners/BoxSpinner";
import { toast } from "react-toastify";

function ReviewForm(props) {
    const context = React.useContext(Context);
    const [stars, setStars] = React.useState(0);
    const [review, setReview] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const callApi = async () => {
            const response = await getReviewAPI({
                productId: props.product.id,
            });

            if (response.data.message !== "No review found") {
                setReview(response.data);
                setStars(response.data.stars);
            }
            setLoading(false);
        };
        callApi();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const description = e.target.description.value;
        const params = {
            product: props.product.id,
            user: context.state.user.id,
            stars: stars,
        };
        if ((title && description) || (!title && !description)) {
            params.title = title || null;
            params.description = description || null;
        } else if (title || description) {
            toast.error("Please fill all the fields");
            return;
        }

        setLoading(true);
        let response;
        if (review.title) {
            response = await updateReviewAPI({
                reviewId: review.id,
                ...params,
            });
            toast.success("Review updated successfully");
        } else {
            response = await createReviewAPI(params);
            toast.success("Review created successfully");
        }
        setReview(response.data);
        setLoading(false);
    };

    return (
        <Container className="mt-4 p-4 bg-light">
            {loading ? (
                <BoxSpinner message="Loading review" />
            ) : (
                <>
                    <h3>Rate Product</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                name="title"
                                defaultValue={review.title}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                name="description"
                                defaultValue={review.description}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="me-2">Rating</Form.Label>
                            {[...Array(stars)].map((_, key) => (
                                <Icons.StarFill
                                    className="me-2 text-warning"
                                    key={key}
                                    onClick={() => {
                                        setStars(key + 1);
                                    }}
                                />
                            ))}
                            {[...Array(5 - stars)].map((_, key) => (
                                <Icons.Star
                                    className="me-2"
                                    key={key}
                                    onClick={() => {
                                        setStars(key + stars + 1);
                                    }}
                                />
                            ))}
                        </Form.Group>
                        {stars > 0 && (
                            <Button variant="primary" type="submit">
                                {review.title ? "Update" : "Submit"}
                            </Button>
                        )}
                    </Form>
                </>
            )}
        </Container>
    );
}

export default ReviewForm;
