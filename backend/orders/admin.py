from django.contrib import admin
from orders import models


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status")
    list_filter = ("status", "created_at", "updated_at")
    search_fields = ("user__email",)
    # readonly_fields = ("user", "status")
