# Generated by Django 3.2.5 on 2022-03-03 11:51
import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0006_auto_20220303_1654"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userratingsandreviewslikes",
            name="ratings_and_reviews",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ratings_and_reviews_likes",
                related_query_name="ratings_and_reviews_likes",
                to="products.ratingandreview",
            ),
        ),
        migrations.AlterField(
            model_name="userratingsandreviewslikes",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ratings_and_reviews_likes",
                related_query_name="ratings_and_reviews_likes",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
