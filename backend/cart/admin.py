from cart import models
from django.contrib import admin

# Register your models here.


@admin.register(models.Cart)
class CartModelAdmin(admin.ModelAdmin):
    list_display = ["user"]
