from accounts import models as accounts_models
from accounts import serializers as accounts_serializers
from products import models
from products import serializers
from rest_framework import authentication
from rest_framework import filters
from rest_framework import generics
from rest_framework import pagination
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework.response import Response


class ProductPagination(pagination.PageNumberPagination):
    model = models.Product
    page_size = 20


class ProductAPI(generics.ListAPIView):
    search_fields = [
        "category",
        "sub_category",
        "short_title",
        "long_title",
        "description",
        "selling_price",
        "specification_title__title",
    ]
    filter_backends = (filters.SearchFilter,)
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all().order_by("?")
    pagination_class = ProductPagination


class WishlistProductAPI(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()

    def get_queryset(self):
        return self.request.user.wishlist.products.all()


class WishlistAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        response = WishlistProductAPI.as_view()(request._request)
        return Response(response.data)

    def put(self, request):
        product_id = request.data.get("id")
        data = put_product(request.user.wishlist, product_id, "wishlist")
        return Response(data)

    def delete(self, request):
        product_id = request.data.get("id")
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        request.user.wishlist.products.remove(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product removed from wishlist"})


class RecentlyViewedProductAPI(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()

    def get_queryset(self):
        recentlyViewed_products = models.RecentlyViewed.products.through.objects.filter(
            recentlyviewed_id=self.request.user.recently_viewed.id
        ).order_by("-id")[:10]
        products = map(lambda x: x.product, recentlyViewed_products)
        return products


class RecentlyViewedAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        response = RecentlyViewedProductAPI.as_view()(request._request)
        return Response(response.data)

    def put(self, request):
        product_id = request.data.get("id")
        request.user.recently_viewed.products.remove(product_id)
        data = put_product(request.user.recently_viewed, product_id, "recently viewed")
        return Response(data)


def put_product(model, product_id, message):
    if product_id is None:
        return {"status": status.HTTP_400_BAD_REQUEST, "data": {"message": "Product id is required"}}
    model.products.add(product_id)

    return {"status": status.HTTP_200_OK, "data": {"message": "Product added to " + message}}


class CompareProductAPI(views.APIView):
    def get(self, request, *args, **kwargs):
        products_ids = [int(val) for val in (request.GET.get("products_ids") or "").split(".")]
        products = models.Product.objects.filter(id__in=products_ids)
        serializer = serializers.ProductSerializer(products, many=True)
        result = {}
        data = serializer.data
        count_titles = {}
        for product in data:
            specification_title = product["specification_titles"]
            for specification in specification_title:
                count_titles[specification.get("title")] = count_titles.get(specification.get("title"), 0) + 1

        for index in range(len(data)):
            specification_title = data[index]["specification_titles"]
            for specification in specification_title:
                title = specification.get("title")
                if count_titles[title] == len(data):
                    result[title] = result.get(title) or {}
                    specifications = specification.get("specifications")
                    for val in specifications:
                        name = val.get("name")
                        value = val.get("value")
                        c = result[title].get(name)
                        if c is None:
                            c = ["-"] * len(data)
                        c[index] = value
                        result[title][name] = c
        return Response(result)


class RatingsAndReviewsLikeAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        ratings_and_reviews = models.RatingAndReview.objects.get(id=kwargs["rar_id"])
        obj, _ = models.RatingsAndReviewsLike.objects.update_or_create(
            user=request.user,
            ratings_and_reviews=ratings_and_reviews,
        )

        if request.data.get("liked") == "True":
            obj.like = not obj.like
            if obj.dislike and obj.like:
                obj.dislike = False
        elif request.data.get("disliked") == "True":
            obj.dislike = not obj.dislike
            if obj.dislike and obj.like:
                obj.like = False
        obj.save()
        return Response(status=status.HTTP_200_OK, data=serializers.RatingsAndReviewsLikeSerializer(obj).data)


class RatingAndReviewsAPI(views.APIView):
    def get(self, request, *args, **kwargs):
        product_id = kwargs["product_id"]
        user_id = request.GET.get("user_id")
        page_no = int(request.GET.get("page_no") or "1")

        try:
            product = models.Product.objects.get(id=product_id)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product not found"})
        total_number_of_ratings = product.ratings_and_reviews.count()
        reviews = serializers.ReviewSerializer(
            product.ratings_and_reviews.filter(description__isnull=False), many=True
        ).data
        for ratings_and_reviews in reviews:
            ratings_and_reviews["user"] = accounts_serializers.UserSerializer(
                accounts_models.User.objects.get(id=ratings_and_reviews["user"])
            ).data
            ratings_and_reviews["total_likes"] = models.RatingsAndReviewsLike.objects.filter(
                ratings_and_reviews=ratings_and_reviews["id"], like=True
            ).count()
            ratings_and_reviews["total_dislikes"] = models.RatingsAndReviewsLike.objects.filter(
                ratings_and_reviews=ratings_and_reviews["id"], dislike=True
            ).count()

        rating_and_review_filter = models.RatingAndReview.objects.filter
        stars = {
            1: rating_and_review_filter(stars=1, product=product).count(),
            2: rating_and_review_filter(stars=2, product=product).count(),
            3: rating_and_review_filter(stars=3, product=product).count(),
            4: rating_and_review_filter(stars=4, product=product).count(),
            5: rating_and_review_filter(stars=5, product=product).count(),
        }
        number_of_ratings = total_number_of_ratings
        number_of_reviews = rating_and_review_filter(description__isnull=False, product=product).count()
        sum_ = 0
        for key, value in stars.items():
            sum_ += key * value
        average_stars = not total_number_of_ratings or round(sum_ / number_of_ratings, 1)
        result = {
            "number_of_ratings": number_of_ratings,
            "number_of_reviews": number_of_reviews,
            "average_stars": average_stars,
            "stars": stars,
            "reviews": paginator(reviews, page_no, 5),
            "is_liked_by_user": models.RatingsAndReviewsLike.objects.filter(
                user=user_id, like=True, ratings_and_reviews__product=product
            ).values_list("ratings_and_reviews__id", flat=True),
            "is_disliked_by_user": models.RatingsAndReviewsLike.objects.filter(
                user=user_id, dislike=True, ratings_and_reviews__product=product
            ).values_list("ratings_and_reviews__id", flat=True),
        }
        return Response(result)


def paginator(lst, page_no, limit):
    end_limit = page_no * limit
    start_limit = end_limit - limit
    return lst[start_limit:end_limit]


class CreateReviewAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = serializers.ReviewSerializer
    queryset = models.RatingAndReview.objects.all()


class UpdateReviewAPI(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = serializers.ReviewSerializer
    queryset = models.RatingAndReview.objects.all()


class GetReviewAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        review = models.RatingAndReview.objects.filter(product__id=kwargs["product_id"], user=request.user).first()
        return Response(data=serializers.ReviewSerializer(review).data if review else {"message": "No review found"})
