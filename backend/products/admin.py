from django.contrib import admin
from products import models


class ProductImageInline(admin.TabularInline):
    extra = 3
    model = models.ProductImage


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

admin.site.register(models.RatingAndReview)
