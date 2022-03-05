from django.urls import path
from products import views
from rest_framework import routers

route = routers.DefaultRouter()
route.register("", views.ProductAPI, basename="products")
urlpatterns = [
    path("wishlist/", views.WishlistAPI.as_view(), name="wishlist"),
    path("recently-viewed/", views.RecentlyViewedAPI.as_view(), name="recently-view"),
    path("compare/", views.CompareProductAPI.as_view(), name="compare"),
    path("rating-review/", views.RatingAndReviewsAPI.as_view(), name="rating-review"),
    path("rating-review-likes/", views.UserRatingsAndReviewsLikesAPI.as_view(), name="rating-review-likes"),
] + route.urls
