# Generated by Django 3.2.5 on 2021-12-06 15:10
import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0001_initial"),
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("Cancelled", "Cancelled"),
                            ("Delivered", "Delivered"),
                            ("Shipped", "Shipped"),
                            ("Out for delivery", "Out for delivery"),
                            ("Returned", "Returned"),
                        ],
                        default="Pending",
                        max_length=100,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("address", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="accounts.address")),
                (
                    "product",
                    models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="products.product"),
                ),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
