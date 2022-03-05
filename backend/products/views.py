from accounts import models as accounts_models
from products import models
from products import serializers
from rest_framework import authentication
from rest_framework import generics
from rest_framework import pagination
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.response import Response


class ProductPagination(pagination.PageNumberPagination):
    model = models.Product
    page_size = 20


class ProductAPI(viewsets.ModelViewSet):
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


class UserRatingsAndReviewsLikesAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request):
        user_id = request.POST.get("user_id")
        if user_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "User id is required"})
        user = accounts_models.User.objects.get(id=user_id)
        rating_and_review_id = request.POST.get("rar_id")
        ratings_and_reviews_likes = models.UserRatingsAndReviewsLikes.objects.filter(
            user=user, ratings_and_reviews=rating_and_review_id
        )
        response = get_likes_update(user_id, rating_and_review_id)
        if ratings_and_reviews_likes.exists():
            ratings_and_reviews_likes.delete()
        like = False
        dislike = False
        for r in response:
            if r.get("like") is True:
                like = True
            if r.get("dislike") is True:
                dislike = True
        if request.POST.get("like") == "True":
            ratings_and_reviews = models.RatingAndReview.objects.get(id=rating_and_review_id)
            ratings_and_reviews.likes += 1
            if dislike:
                ratings_and_reviews.dislikes -= 1
            ratings_and_reviews.save()
        elif request.POST.get("dislike") == "True":
            ratings_and_reviews = models.RatingAndReview.objects.get(id=rating_and_review_id)
            ratings_and_reviews.dislikes += 1
            if like:
                ratings_and_reviews.likes -= 1
            ratings_and_reviews.save()
        ratings_and_reviews_likes = models.UserRatingsAndReviewsLikes.objects.create(
            user=user,
            ratings_and_reviews=models.RatingAndReview.objects.get(id=rating_and_review_id),
            like=request.data.get("like"),
            dislike=request.data.get("dislike"),
        )
        ratings_and_reviews_likes.save()
        return Response(status=status.HTTP_200_OK, data={"message": "Success"})


def get_likes_update(user_id, rar_id):
    user = accounts_models.User.objects.get(id=user_id)
    ratings_and_reviews_likes = models.UserRatingsAndReviewsLikes.objects.filter(user=user, ratings_and_reviews=rar_id)
    data = serializers.UserRatingAndReviewsLikesSerializer(ratings_and_reviews_likes, many=True).data
    return data


class RatingAndReviewsAPI(views.APIView):
    def get(self, request, *args, **kwargs):
        product_id = request.GET.get("product_id")
        user_id = request.GET.get("user_id")
        page_no = request.GET.get("page_no")
        end_limit = int(page_no) * 5
        start_limit = end_limit - 5
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        product = models.Product.objects.get(id=product_id)
        serializer = serializers.RatingAndReviewsSerializer(product.ratings_and_reviews.all(), many=True)
        data = serializer.data
        stars = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        number_of_ratings = len(data)
        number_of_reviews = 0
        for reviews in data:
            if user_id is not None:
                rar = reviews.get("id")
                response = get_likes_update(user_id, rar)
                reviews["liked_by_user"] = False
                reviews["disliked_by_user"] = False
                for r in response:
                    reviews["liked_by_user"] = r.get("like")
                    reviews["disliked_by_user"] = r.get("dislike")
            stars[reviews.get("stars")] += 1
            if reviews.get("description") is not None:
                number_of_reviews += 1
        sum_ = 0
        for key, value in stars.items():
            sum_ += key * value
        if start_limit <= len(data):
            data = data[start_limit:end_limit]
        else:
            data = []
        result = {
            "number_of_ratings": number_of_ratings,
            "number_of_reviews": number_of_reviews,
            "average_stars": round(sum_ / number_of_ratings, 1),
            "stars": stars,
            "reviews": data,
        }
        return Response(result)

    def post(self, request):
        product_id = request.data.get("product_id")
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        product = models.Product.objects.get(id=product_id)
        user_id = request.data.get("user_id")
        user = accounts_models.User.objects.get(id=user_id)
        models.RatingAndReview.objects.create(
            user=user,
            product=product,
            stars=request.data.get("stars"),
            description=request.data.get("description"),
            title=request.data.get("title"),
        )
        return Response(status=status.HTTP_200_OK, data={"message": "Success"})
