# Generated by Django 3.2.5 on 2022-03-03 10:57
import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0003_auto_20220127_1847"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="ratingandreview",
            name="dislikes",
        ),
        migrations.RemoveField(
            model_name="ratingandreview",
            name="likes",
        ),
        migrations.RemoveField(
            model_name="ratingandreview",
            name="name",
        ),
        migrations.AlterField(
            model_name="ratingandreview",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ratings_and_reviews",
                related_query_name="ratings_and_reviews",
                to="products.product",
            ),
        ),
        migrations.AlterField(
            model_name="ratingandreview",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ratings_and_reviews",
                related_query_name="ratings_and_reviews",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.CreateModel(
            name="UserRatingsAndReviewsLikes",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "ratings_and_reviews",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="likes_maintained",
                        related_query_name="likes_maintained",
                        to="products.ratingandreview",
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="likes_maintained",
                        related_query_name="likes_maintained",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
