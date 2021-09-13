# Generated by Django 3.2.5 on 2021-09-06 09:46
import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("short_title", models.CharField(max_length=70)),
                ("long_title", models.CharField(max_length=256)),
                ("actual_price", models.PositiveIntegerField()),
                ("selling_price", models.PositiveIntegerField()),
                ("quantity", models.PositiveIntegerField(default=1)),
                ("shipping_fee", models.PositiveIntegerField(default=0)),
                ("description", models.TextField()),
                ("discount", models.PositiveIntegerField()),
                ("tagline", models.CharField(max_length=200)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Mobiles", "Mobiles"),
                            ("Mobile Accessories", "Mobile Accessories"),
                            ("Smart Wearable Tech", "Smart Wearable Tech"),
                            ("Television", "Television"),
                            ("Laptops", "Laptops"),
                            ("Camera", "Camera"),
                            ("Camera Accessories", "Camera Accessories"),
                            ("Speakers", "Speakers"),
                            ("Desktop PCs", "Desktop PCs"),
                            ("Gaming & Accessories", "Gaming & Accessories"),
                            ("Computer Accessories", "Computer Accessories"),
                            ("Computer Peripherals", "Computer Peripherals"),
                            ("Tablets", "Tablets"),
                        ],
                        max_length=70,
                    ),
                ),
                (
                    "sub_category",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("MI", "MI"),
                            ("RealMe", "RealMe"),
                            ("Samsung", "Samsung"),
                            ("Oppo", "Oppo"),
                            ("Apple", "Apple"),
                            ("Vivo", "Vivo"),
                            ("Motorola", "Motorola"),
                            ("OnePlus", "OnePlus"),
                            ("Headphones and headsets", "Headphones and headsets"),
                            ("Memory Card", "Memory Card"),
                            ("Power Banks", "Power Banks"),
                            ("Mobile Chargers", "Mobile Chargers"),
                            ("Smart Watches", "Smart Watches"),
                            ("Home Theatres", "Home Theatres"),
                            ("JBL Speakers", "JBL Speakers"),
                            ("Bluetooth Speakers", "Bluetooth Speakers"),
                            ("DSLR & Mirrorless", "DSLR & Mirrorless"),
                            ("Sports & Action", "Sports & Action"),
                            ("Lens", "Lens"),
                            ("Tripods", "Tripods"),
                            ("Gaming Laptops", "Gaming Laptops"),
                            ("External HardDisks", "External HardDisks"),
                            ("Pendrives", "Pendrives"),
                            ("Mouse", "Mouse"),
                            ("Printers", "Printers"),
                            ("Monitors", "Monitors"),
                            ("Apple iPads", "Apple iPads"),
                        ],
                        max_length=70,
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "seller",
                    models.ForeignKey(
                        editable=False,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="products",
                        related_query_name="product",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="WishList",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("product", models.ManyToManyField(to="products.Product")),
                (
                    "user",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={
                "verbose_name_plural": "Wishlist",
            },
        ),
        migrations.CreateModel(
            name="SpecificationTitle",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=90)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="specification_titles",
                        related_query_name="specification_title",
                        to="products.product",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Specifications",
            },
        ),
        migrations.CreateModel(
            name="Specification",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=256)),
                ("value", models.CharField(max_length=256)),
                (
                    "specification_title",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="specifications",
                        related_query_name="specification",
                        to="products.specificationtitle",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="RatingAndReview",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("likes", models.PositiveIntegerField()),
                ("dislikes", models.PositiveIntegerField()),
                ("stars", models.PositiveIntegerField()),
                ("description", models.TextField()),
                ("title", models.CharField(max_length=100)),
                ("name", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reviews_and_ratings",
                        related_query_name="review_and_rating",
                        to="products.product",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProductImage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image_url", models.ImageField(upload_to="product_images/")),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        related_query_name="image",
                        to="products.product",
                    ),
                ),
            ],
        ),
    ]
