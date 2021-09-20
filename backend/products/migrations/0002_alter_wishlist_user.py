# Generated by Django 3.2.5 on 2021-09-20 13:00
import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="wishlist",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="wishlist",
                related_query_name="wishlist",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
