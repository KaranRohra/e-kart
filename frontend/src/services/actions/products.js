import { isUserAuthenticated } from "services/apis/accounts";
import { reviewLikeDislikeAPI } from "services/apis/products";

export const handleLike = (reviewId) => {
    if (isUserAuthenticated()) {
        reviewLikeDislikeAPI({
            reviewId: reviewId,
            liked: "True",
        });
        window.location.reload();
    } else {
        window.location.href = "/login";
    }
};

export const handleDislike = (reviewId) => {
    if (isUserAuthenticated()) {
        reviewLikeDislikeAPI({
            reviewId: reviewId,
            disliked: "True",
        });
        window.location.reload();
    } else {
        window.location.href = "/login";
    }
};
