from accounts import models
from django.contrib import admin


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "first_name", "last_name", "is_superuser", "is_staff")
    readonly_fields = ("password",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "phone_number")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    search_fields = ("email", "first_name", "last_name")


@admin.register(models.Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("id", "user")
    search_fields = ("email", "name")
    fieldsets = (
        ("Personal info", {"fields": ("user", "name")}),
        (
            "Address Details",
            {
                "fields": (
                    "address_line_1",
                    "address_line_2",
                    "city",
                    "state",
                    "landmark",
                    "pincode",
                ),
            },
        ),
        ("Conctact Info", {"fields": ("phone_number_1", "phone_number_2")}),
        ("Delete Address", {"fields": ("is_deleted",)}),
    )
