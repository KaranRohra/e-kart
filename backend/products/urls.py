from django.urls import path
from products import views

urlpatterns = [
    path("wishlist/", views.WishlistAPI.as_view(), name="wishlist"),
    path("recently-viewed/", views.RecentlyViewedAPI.as_view(), name="recently-view"),
    path("compare/", views.CompareProductAPI.as_view(), name="compare"),
    path("<int:product_id>/rating-review/", views.RatingAndReviewsAPI.as_view(), name="rating-review"),
    path("rating-review-likes/<int:rar_id>/", views.RatingsAndReviewsLikeAPI.as_view(), name="rating-review-likes"),
    path("create-review/", views.CreateReviewAPI.as_view(), name="create-review"),
    path("review/<int:pk>/", views.UpdateReviewAPI.as_view(), name="create-review"),
    path("<int:product_id>/review/", views.GetReviewAPI.as_view(), name="create-review"),
    path("<int:pk>/", views.SingleProductAPI.as_view(), name="product-list"),
    path("", views.ProductAPI.as_view(), name="product-list"),
]
