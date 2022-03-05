from django.contrib import admin
from products import models


class ProductImageInline(admin.TabularInline):
    extra = 3
    model = models.ProductImage


@admin.register(models.UserRatingsAndReviewsLikes)
class RatingAndReviewLikesAdmin(admin.ModelAdmin):
    list_display = ("id", "user")


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_title",
    )
    search_fields = ("short_title",)
    inlines = (ProductImageInline,)


class SpecificationInline(admin.TabularInline):
    extra = 3
    model = models.Specification


@admin.register(models.SpecificationTitle)
class SpecificationTitleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "product")
    inlines = (SpecificationInline,)


admin.site.register(models.WishList)
admin.site.register(models.RecentlyViewed)


@admin.register(models.RatingAndReview)
class RatingAndReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "user", "product")
    search_fields = ("title", "user", "product")
    list_filter = ("product",)
